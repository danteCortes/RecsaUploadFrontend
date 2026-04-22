import { Component, inject } from '@angular/core';
import { faFileLines, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FileService } from '../../../infrastructure/services/FileService';

@Component({
  selector: 'app-import-datas-summary',
  templateUrl: './summary.html',
  imports: [FaIconComponent, NgClass],
})
export class ImportDatasSummary {
  faFileLines = faFileLines;
  faDatabase = faDatabase;

  private fileService = inject(FileService);
  private router = inject(Router);

  readonly files = this.fileService.files;

  private paths = [
    '/cargas/importar',
    '/cargas/importar/formato',
    '/cargas/importar/columnas',
    '/cargas/importar/origen',
    '/cargas/importar/confirmar',
  ];

  getStep(): number {
    return this.paths.indexOf(this.router.url) + 1;
  }

  getExtensions(files: File[]): string {
    const extensions = files
      .map((file) => file.name.split('.').pop()?.toLowerCase() ?? '')
      .filter((ext) => ext !== '');

    const unique = Array.from(new Set(extensions));

    return unique.map((ext) => ext.toUpperCase()).join(', ');
  }

  getPercent(): string {
    const percent = (this.paths.indexOf(this.router.url) + 1) * 20;
    return `${percent}%`;
  }

  getWidth(): string {
    const part = this.paths.indexOf(this.router.url) + 1;
    return `w-${part}/5`;
  }
}
