import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./views/login/login.component').then(l => l.LoginComponent),
        title: 'Login',
    },
    {
        path: 'register',
        loadComponent: () => import('./views/register/register.component').then(r => r.RegisterComponent),
        title: 'Registrar',
    },
    {
        path: 'videos',
        loadComponent: () => import('./views/videos/videos.component').then(v => v.VideosComponent),
        canActivate: [authGuard],
        title: 'Videos',
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
