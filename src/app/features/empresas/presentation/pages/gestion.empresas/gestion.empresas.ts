import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faMagnifyingGlass, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Empresa {
  codigo: string;
  nombre: string;
  nombreFantasia: string;
  pais: string;
  responsable: string;
  activo: boolean;
}

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion.empresas.html',
  imports: [RouterLink, FaIconComponent],
})
export class GestionEmpresas {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPen = faPen;
  readonly faTrash = faTrash;

  readonly empresas = signal<Empresa[]>([
    { codigo: 'EMP001', nombre: 'Empresa Demo S.A.', nombreFantasia: 'Demo Corp', pais: 'Argentina', responsable: 'Juan Pérez', activo: true },
    { codigo: 'EMP002', nombre: 'Servicios Integrales Ltda.', nombreFantasia: 'Servint', pais: 'Chile', responsable: 'María González', activo: true },
    { codigo: 'EMP003', nombre: 'Tecnología Avanzada Inc.', nombreFantasia: 'TechAdv', pais: 'México', responsable: 'Carlos Rodríguez', activo: false },
  ]);

  readonly total = computed(() => this.empresas().length);
  readonly activas = computed(() => this.empresas().filter(e => e.activo).length);
  readonly inactivas = computed(() => this.empresas().filter(e => !e.activo).length);

  toggleEstado(codigo: string): void {
    this.empresas.update(items =>
      items.map(item => item.codigo === codigo ? { ...item, activo: !item.activo } : item)
    );
  }
}
