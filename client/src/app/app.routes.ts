import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts').then((m) => m.Contacts),
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop').then((m) => m.Shop),
  },
  {
    path: 'shop/:id',
    loadComponent: () => import('./pages/shop-id/shop-id').then((m) => m.ProductDetail),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];

