import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nueva-empresa',
  templateUrl: './nueva.empresa.html',
  imports: [RouterLink, FaIconComponent],
})
export class NuevaEmpresa {
  readonly faArrowLeft = faArrowLeft;

  readonly paises = ['Argentina', 'Chile', 'México', 'Colombia', 'Perú', 'Brasil', 'Uruguay'];

  readonly opcionesProducto = ['Incluye producto', 'Si', 'No'];
  readonly opcionesArmory = ['Pertenece a Armory', 'Si', 'No'];
  readonly opcionesPaleta = ['Incluye paleta de respuestas', 'Si', 'No'];
  readonly opcionesHomologaciones = ['Incluye homologaciones', 'Si', 'No'];

  readonly codigo = signal('');
  readonly nombre = signal('');
  readonly responsable = signal('');
  readonly pais = signal('');
  readonly nombreFantasia = signal('');
}
