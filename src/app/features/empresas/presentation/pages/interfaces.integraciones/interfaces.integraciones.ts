import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faMagnifyingGlass, faEye, faPen } from '@fortawesome/free-solid-svg-icons';

interface Integracion {
  nombre: string;
  pais: string;
  empresa: string;
  activo: boolean;
}

@Component({
  selector: 'app-interfaces-integraciones',
  templateUrl: './interfaces.integraciones.html',
  imports: [RouterLink, FaIconComponent],
})
export class InterfacesIntegraciones {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPen = faPen;

  readonly integraciones = signal<Integracion[]>([
    { nombre: 'ASIGNACION', pais: 'Argentina', empresa: 'Empresa Demo S.A.', activo: true },
    { nombre: 'PAGOS', pais: 'Chile', empresa: 'Servicios Integrales Ltda.', activo: true },
    { nombre: 'GESTIONES', pais: 'México', empresa: 'Tecnología Avanzada Inc.', activo: false },
  ]);

  readonly total = computed(() => this.integraciones().length);
  readonly activas = computed(() => this.integraciones().filter(i => i.activo).length);
  readonly inactivas = computed(() => this.integraciones().filter(i => !i.activo).length);

  toggleEstado(nombre: string): void {
    this.integraciones.update(items =>
      items.map(item => item.nombre === nombre ? { ...item, activo: !item.activo } : item)
    );
  }
}
