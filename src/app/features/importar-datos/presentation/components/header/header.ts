import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  faArrowUpFromBracket,
  faCheck,
  faCheckSquare,
  faCog,
  faDatabase,
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
  faDatabase = faDatabase;
  faCheck = faCheck;

  private router = inject(Router);

  setBackgroundColor(step: number): string {
    const paths = [
      '/cargas/importar',
      '/cargas/importar/formato',
      '/cargas/importar/columnas',
      '/cargas/importar/origen',
      '/cargas/importar/confirmar',
    ];

    if (paths.indexOf(this.router.url) === step) {
      return 'bg-[#1E3A5F] shadow-[#1E3A5F]/20 shadow-lg text-white';
    } else if (paths.indexOf(this.router.url) < step) {
      return 'bg-white text-[#1A1614]/40';
    } else {
      return 'bg-[#2D9596] text-white';
    }
  }
}
