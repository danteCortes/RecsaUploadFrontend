import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ItemIntegracion {
  id: number;
  nombre: string;
  pais: string;
  empresa: string;
}

@Component({
  selector: 'app-nueva-integracion',
  templateUrl: './nueva.integracion.html',
  imports: [RouterLink, FaIconComponent],
})
export class NuevaIntegracion {
  readonly faArrowLeft = faArrowLeft;
  readonly faPlus = faPlus;
  readonly faTrash = faTrash;

  readonly paises = ['Argentina', 'Chile', 'México', 'Colombia', 'Perú', 'Brasil', 'Uruguay'];
  readonly empresas = ['Empresa Demo S.A.', 'Servicios Integrales Ltda.', 'Tecnología Avanzada Inc.'];

  private nextId = signal(2);

  readonly items = signal<ItemIntegracion[]>([
    { id: 1, nombre: '', pais: '', empresa: '' },
  ]);

  agregarMas(): void {
    const id = this.nextId();
    this.items.update(list => [...list, { id, nombre: '', pais: '', empresa: '' }]);
    this.nextId.update(n => n + 1);
  }

  eliminar(id: number): void {
    if (this.items().length > 1) {
      this.items.update(list => list.filter(item => item.id !== id));
    }
  }
}
