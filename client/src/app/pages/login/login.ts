import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth/auth';
import { LoginPayload } from '../../shared/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  form: LoginPayload = { username: '', password: '' };

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  onSubmit() {
    if (!this.form.username || !this.form.password) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.form).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const detail = err?.error;
        if (detail?.non_field_errors) {
          this.errorMessage.set(detail.non_field_errors[0]);
        } else if (detail?.detail) {
          this.errorMessage.set(detail.detail);
        } else {
          this.errorMessage.set('Invalid username or password.');
        }
      },
    });
  }
}
