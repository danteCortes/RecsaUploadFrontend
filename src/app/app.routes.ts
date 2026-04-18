import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/presentation/pages/dashboard';
import { ImportarDatos } from './features/importar-datos/presentation/pages/importar.datos';

export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'cargas/importar', component: ImportarDatos},
];
