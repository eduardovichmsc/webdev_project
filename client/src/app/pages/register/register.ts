import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth/auth';
import { RegisterPayload } from '../../shared/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
})
export class Register {
  form: RegisterPayload = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  fieldErrors = signal<Record<string, string>>({});
  showPassword = signal(false);
  showPassword2 = signal(false);

  get passwordMismatch(): boolean {
    return (
      !!this.form.password &&
      !!this.form.password2 &&
      this.form.password !== this.form.password2
    );
  }

  get passwordStrength(): 'weak' | 'medium' | 'strong' | null {
    const p = this.form.password;
    if (!p) return null;
    const hasUpper = /[A-Z]/.test(p);
    const hasDigit = /\d/.test(p);
    if (p.length >= 10 && hasUpper && hasDigit) return 'strong';
    if (p.length >= 6 && (hasUpper || hasDigit)) return 'medium';
    return 'weak';
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePassword(field: 1 | 2) {
    if (field === 1) this.showPassword.update((v) => !v);
    else this.showPassword2.update((v) => !v);
  }

  getFieldError(field: string): string | null {
    return this.fieldErrors()[field] ?? null;
  }

  onSubmit() {
    if (this.passwordMismatch) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.fieldErrors.set({});

    this.authService.register(this.form).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const detail = err?.error;
        if (typeof detail === 'object' && detail !== null) {
          const map: Record<string, string> = {};
          let globalMsg: string | null = null;

          for (const [key, val] of Object.entries(detail)) {
            const msg = Array.isArray(val) ? (val as string[])[0] : String(val);
            if (key === 'non_field_errors' || key === 'detail') {
              globalMsg = msg;
            } else {
              map[key] = msg;
            }
          }

          this.fieldErrors.set(map);
          if (globalMsg) this.errorMessage.set(globalMsg);
        } else {
          this.errorMessage.set('Registration failed. Please try again.');
        }
      },
    });
  }
}
