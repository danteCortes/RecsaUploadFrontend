import { Component, computed, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faClock,
  faSpinner,
  faCircleCheck,
  faCircleXmark,
  faMagnifyingGlass,
  faPlay,
  faPause,
  faStop,
  faRotateRight,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

type EstadoProceso = 'Pendiente' | 'Ejecutado' | 'Finalizado' | 'Error';
type TipoProceso = 'Flujo' | 'Refresco';

interface Proceso {
  empresa: string;
  tipo: TipoProceso;
  fechaInicio: string;
  estado: EstadoProceso;
  duracion: string;
  registros: string;
}

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.html',
  imports: [FaIconComponent],
})
export class Bitacora {
  readonly faClock = faClock;
  readonly faSpinner = faSpinner;
  readonly faCircleCheck = faCircleCheck;
  readonly faCircleXmark = faCircleXmark;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPlay = faPlay;
  readonly faPause = faPause;
  readonly faStop = faStop;
  readonly faRotateRight = faRotateRight;
  readonly faEye = faEye;

  readonly procesos = signal<Proceso[]>([
    {
      empresa: 'Empresa Demo S.A.',
      tipo: 'Flujo',
      fechaInicio: '2026-04-22 09:30:00',
      estado: 'Finalizado',
      duracion: '2m 15s',
      registros: '15.420',
    },
    {
      empresa: 'Servicios Integrales Ltda.',
      tipo: 'Refresco',
      fechaInicio: '2026-04-22 10:15:00',
      estado: 'Ejecutado',
      duracion: '1m 45s',
      registros: '8750',
    },
    {
      empresa: 'Tecnología Avanzada Inc.',
      tipo: 'Flujo',
      fechaInicio: '2026-04-22 11:00:00',
      estado: 'Error',
      duracion: '0m 32s',
      registros: '-',
    },
    {
      empresa: 'Empresa Demo S.A.',
      tipo: 'Refresco',
      fechaInicio: '2026-04-22 11:30:00',
      estado: 'Pendiente',
      duracion: '-',
      registros: '-',
    },
    {
      empresa: 'Servicios Integrales Ltda.',
      tipo: 'Flujo',
      fechaInicio: '2026-04-22 12:00:00',
      estado: 'Pendiente',
      duracion: '-',
      registros: '-',
    },
  ]);

  readonly pendientes = computed(
    () => this.procesos().filter((p) => p.estado === 'Pendiente').length,
  );
  readonly ejecutados = computed(
    () => this.procesos().filter((p) => p.estado === 'Ejecutado').length,
  );
  readonly finalizados = computed(
    () => this.procesos().filter((p) => p.estado === 'Finalizado').length,
  );
  readonly conErrores = computed(() => this.procesos().filter((p) => p.estado === 'Error').length);

  estadoColor(estado: EstadoProceso): string {
    const map: Record<EstadoProceso, string> = {
      Pendiente: 'text-rin-muted',
      Ejecutado: 'text-rin-orange',
      Finalizado: 'text-rin-success',
      Error: 'text-rin-critical',
    };
    return map[estado];
  }

  tipoBadgeClass(tipo: TipoProceso): string {
    return tipo === 'Flujo'
      ? 'bg-rin-ink/10 text-rin-ink'
      : 'bg-rin-orange/15 text-rin-orange';
  }
}
