import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../core/environments/environment';
import {
  AuthResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  ProfileUpdatePayload,
  ProfileUpdateResponse,
  ChangePasswordPayload,
  UserProfile,
} from '../../models/auth.model';

const STORAGE_KEYS = {
  ACCESS: 'access_token',
  REFRESH: 'refresh_token',
  USER: 'user',
} as const;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/auth`;

  private _user = signal<AuthUser | null>(this.loadUser());
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => !!this._user());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // ─── Tokens ──────────────────────────────────────────────────────────────

  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH);
  }

  private saveSession(res: AuthResponse): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS, res.access);
    localStorage.setItem(STORAGE_KEYS.REFRESH, res.refresh);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
    this._user.set(res.user);
  }

  private clearSession(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS);
    localStorage.removeItem(STORAGE_KEYS.REFRESH);
    localStorage.removeItem(STORAGE_KEYS.USER);
    this._user.set(null);
  }

  private loadUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  // ─── API calls ───────────────────────────────────────────────────────────

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base}/login/`, payload)
      .pipe(tap((res) => this.saveSession(res)));
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base}/register/`, payload)
      .pipe(tap((res) => this.saveSession(res)));
  }

  refreshToken(): Observable<{ access: string }> {
    const refresh = this.getRefreshToken();
    return this.http
      .post<{ access: string }>(`${this.base}/refresh/`, { refresh })
      .pipe(tap(({ access }) => localStorage.setItem(STORAGE_KEYS.ACCESS, access)));
  }

  logout(): void {
    const refresh = this.getRefreshToken();
    if (refresh) {
      this.http.post(`${this.base}/logout/`, { refresh }).subscribe({ error: () => {} });
    }
    this.clearSession();
    this.router.navigate(['/']);
  }

  // ─── Profile ─────────────────────────────────────────────────────────────

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.base}/profile/`);
  }

  updateProfile(payload: ProfileUpdatePayload): Observable<ProfileUpdateResponse> {
    return this.http.patch<ProfileUpdateResponse>(`${this.base}/profile/`, payload).pipe(
      tap((res) => {
        const updated: AuthUser = res.user;
        this._user.set(updated);
        localStorage.setItem('user', JSON.stringify(updated));
      }),
    );
  }

  changePassword(payload: ChangePasswordPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/change-password/`, payload);
  }
}
