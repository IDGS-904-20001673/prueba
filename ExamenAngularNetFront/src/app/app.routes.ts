import { Routes } from '@angular/router';

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
        path: '**',
        redirectTo: 'login'
    }
];
