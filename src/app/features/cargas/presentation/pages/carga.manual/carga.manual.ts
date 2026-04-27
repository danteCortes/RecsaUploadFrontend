import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faMagnifyingGlass,
  faFileLines,
  faPen,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';

interface ConfiguracionCarga {
  codigo: string;
  empresa: string;
  pais: string;
  responsable: string;
  activo: boolean;
}

@Component({
  selector: 'app-carga-manual',
  templateUrl: './carga.manual.html',
  imports: [RouterLink, FaIconComponent],
})
export class CargaManual {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faFileLines = faFileLines;
  readonly faPen = faPen;
  readonly faDownload = faDownload;

  readonly configuraciones = signal<ConfiguracionCarga[]>([
    { codigo: 'EMP001', empresa: 'Empresa Demo S.A.', pais: 'Argentina', responsable: 'Juan Pérez', activo: true },
    { codigo: 'EMP002', empresa: 'Servicios Integrales Ltda.', pais: 'Chile', responsable: 'María González', activo: true },
    { codigo: 'EMP003', empresa: 'Tecnología Avanzada Inc.', pais: 'México', responsable: 'Carlos Rodríguez', activo: false },
  ]);

  readonly total = computed(() => this.configuraciones().length);
  readonly activas = computed(() => this.configuraciones().filter(c => c.activo).length);
  readonly inactivas = computed(() => this.configuraciones().filter(c => !c.activo).length);

  toggleEstado(codigo: string): void {
    this.configuraciones.update(items =>
      items.map(item => item.codigo === codigo ? { ...item, activo: !item.activo } : item)
    );
  }
}
