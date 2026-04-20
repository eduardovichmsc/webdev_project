import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../shared/services/auth/auth';
import { ProfileUpdatePayload, ChangePasswordPayload } from '../../shared/models/auth.model';

type AccountSection = 'view' | 'edit-profile' | 'change-password';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
})
export class Profile {
  constructor(
    private titleService: Title,
    public authService: AuthService,
  ) {
    this.titleService.setTitle('My Profile — Simuero');
  }

  // ─── Section ──────────────────────────────────────────────────────────────

  accountSection = signal<AccountSection>('view');

  // ─── Edit profile form ────────────────────────────────────────────────────

  profileForm: ProfileUpdatePayload = { username: '', email: '' };
  isSavingProfile = signal(false);
  profileSuccess = signal<string | null>(null);
  profileErrors = signal<Record<string, string>>({});

  // ─── Change password form ─────────────────────────────────────────────────

  pwForm: ChangePasswordPayload = {
    old_password: '',
    new_password: '',
    new_password2: '',
  };
  showOldPw = signal(false);
  showNewPw = signal(false);
  showNewPw2 = signal(false);
  isSavingPw = signal(false);
  pwSuccess = signal<string | null>(null);
  pwErrors = signal<Record<string, string>>({});

  // ─── Computed helpers ─────────────────────────────────────────────────────

  get user() {
    return this.authService.user();
  }

  get initials(): string {
    return (this.user?.username ?? '').slice(0, 2).toUpperCase();
  }

  get pwMismatch(): boolean {
    return (
      !!this.pwForm.new_password &&
      !!this.pwForm.new_password2 &&
      this.pwForm.new_password !== this.pwForm.new_password2
    );
  }

  get pwStrength(): 'weak' | 'medium' | 'strong' | null {
    const p = this.pwForm.new_password;
    if (!p) return null;
    if (p.length >= 10 && /[A-Z]/.test(p) && /\d/.test(p)) return 'strong';
    if (p.length >= 6 && (/[A-Z]/.test(p) || /\d/.test(p))) return 'medium';
    return 'weak';
  }

  getProfileError(field: string): string | null {
    return this.profileErrors()[field] ?? null;
  }

  getPwError(field: string): string | null {
    return this.pwErrors()[field] ?? null;
  }

  // ─── Section navigation ───────────────────────────────────────────────────

  openEditProfile() {
    this.profileForm = {
      username: this.user?.username ?? '',
      email: this.user?.email ?? '',
    };
    this.profileSuccess.set(null);
    this.profileErrors.set({});
    this.accountSection.set('edit-profile');
  }

  openChangePassword() {
    this.pwForm = { old_password: '', new_password: '', new_password2: '' };
    this.pwSuccess.set(null);
    this.pwErrors.set({});
    this.accountSection.set('change-password');
  }

  backToView() {
    this.accountSection.set('view');
  }

  // ─── Update profile ───────────────────────────────────────────────────────

  saveProfile(): void {
    this.isSavingProfile.set(true);
    this.profileSuccess.set(null);
    this.profileErrors.set({});

    this.authService.updateProfile(this.profileForm).subscribe({
      next: (res) => {
        this.isSavingProfile.set(false);
        this.profileSuccess.set(res.message || 'Profile updated successfully.');
        setTimeout(() => this.accountSection.set('view'), 1200);
      },
      error: (err) => {
        this.isSavingProfile.set(false);
        const detail = err?.error;
        if (typeof detail === 'object') {
          const map: Record<string, string> = {};
          for (const [k, v] of Object.entries(detail)) {
            map[k] = Array.isArray(v) ? (v as string[])[0] : String(v);
          }
          this.profileErrors.set(map);
        }
      },
    });
  }

  // ─── Change password ──────────────────────────────────────────────────────

  savePassword(): void {
    if (this.pwMismatch) return;
    this.isSavingPw.set(true);
    this.pwSuccess.set(null);
    this.pwErrors.set({});

    this.authService.changePassword(this.pwForm).subscribe({
      next: (res) => {
        this.isSavingPw.set(false);
        this.pwSuccess.set(res.message || 'Password changed successfully.');
        this.pwForm = { old_password: '', new_password: '', new_password2: '' };
        setTimeout(() => this.accountSection.set('view'), 1400);
      },
      error: (err) => {
        this.isSavingPw.set(false);
        const detail = err?.error;
        if (typeof detail === 'object') {
          const map: Record<string, string> = {};
          for (const [k, v] of Object.entries(detail)) {
            map[k] = Array.isArray(v) ? (v as string[])[0] : String(v);
          }
          this.pwErrors.set(map);
        }
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  togglePw(field: 'old' | 'new' | 'new2') {
    if (field === 'old') this.showOldPw.update((v) => !v);
    else if (field === 'new') this.showNewPw.update((v) => !v);
    else this.showNewPw2.update((v) => !v);
  }
}
