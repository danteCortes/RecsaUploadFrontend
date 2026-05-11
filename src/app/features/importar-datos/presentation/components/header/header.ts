import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  faArrowUpFromBracket,
  faCheck,
  faCheckSquare,
  faCog,
  faDiagramProject,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-importar-datos-header',
  templateUrl: './header.html',
  imports: [FaIconComponent, NgClass],
})
export class ImportarDatosHeader {
  faArrowUpFromBracket = faArrowUpFromBracket;
  faCog = faCog;
  faCheckSquare = faCheckSquare;
  faDiagramProject = faDiagramProject;
  faPaperPlane = faPaperPlane;
  faCheck = faCheck;

  private router = inject(Router);

  readonly paths = [
    '/cargas/importar/manual/nueva',
    '/cargas/importar/manual/nueva/archivos',
    '/cargas/importar/manual/nueva/formato',
    '/cargas/importar/manual/nueva/columnas',
    '/cargas/importar/manual/nueva/confirmar',
  ];

  setBackgroundColor(step: number): string {
    const current = this.paths.indexOf(this.router.url);
    if (current === step) {
      return 'bg-rin-ink shadow-lg text-white';
    } else if (current > step) {
      return 'bg-rin-orange text-white';
    } else {
      return 'bg-white text-rin-ink/40 border border-rin-line';
    }
  }
}
