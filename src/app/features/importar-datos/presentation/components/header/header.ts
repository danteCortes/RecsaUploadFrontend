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
      return 'bg-[#1E3A5F] shadow-[#1E3A5F]/20 shadow-lg text-white';
    } else if (current > step) {
      return 'bg-[#2D9596] text-white';
    } else {
      return 'bg-white text-[#1A1614]/40 border border-[#E4DDD1]';
    }
  }
}
