import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  { path: '', redirectTo: '/admin-dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin-dashboard' }
];
