import type { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/presentation/pages/dashboard';
import { ImportarDatosIndex } from './features/importar-datos/presentation/pages/index/index';
import { ImportarDatos } from './features/importar-datos/presentation/pages/importar.datos/importar.datos';
import { ConfigurarFormato } from './features/importar-datos/presentation/pages/configurar.formato/configurar.formato';
import { CheckColumns } from './features/importar-datos/presentation/pages/check.columns/check.columns';
import { DataOrigin } from './features/importar-datos/presentation/pages/data.origin/data.origin';
import { Automatizar } from './features/cargas/presentation/pages/automatizar/automatizar';
import { CargaManual } from './features/cargas/presentation/pages/carga.manual/carga.manual';
import { Bitacora } from './features/cargas/presentation/pages/bitacora/bitacora';
import { GestionEmpresas } from './features/empresas/presentation/pages/gestion.empresas/gestion.empresas';
import { NuevaEmpresa } from './features/empresas/presentation/pages/nueva.empresa/nueva.empresa';
import { InterfacesIntegraciones } from './features/empresas/presentation/pages/interfaces.integraciones/interfaces.integraciones';
import { NuevaIntegracion } from './features/empresas/presentation/pages/nueva.integracion/nueva.integracion';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'cargas/importar', component: Dashboard },
  { path: 'cargas/automatizar', component: Automatizar },
  { path: 'cargas/importar/manual', component: CargaManual },
  { path: 'cargas/bitacora', component: Bitacora },
  {
    path: 'cargas/importar/manual/nueva',
    component: ImportarDatosIndex,
    data: {
      title: 'Carga Manual de Datos',
      subtitle: 'Cargá y procesá tus archivos usando configuración existente',
      backLink: '/cargas/importar/manual',
      backText: 'Volver a carga manual',
    },
    children: [
      { path: '', component: ImportarDatos },
      { path: 'formato', component: ConfigurarFormato },
      { path: 'columnas', component: CheckColumns },
      { path: 'origen', component: DataOrigin },
      { path: 'confirmar', component: ImportarDatos },
    ],
  },
  { path: 'empresas', component: GestionEmpresas },
  { path: 'empresas/nueva', component: NuevaEmpresa },
  { path: 'empresas/interfaces', component: InterfacesIntegraciones },
  { path: 'empresas/interfaces/nueva', component: NuevaIntegracion },
  { path: 'empresas/plantillas', component: Dashboard },
];
