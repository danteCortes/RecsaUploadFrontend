import { Component, inject } from '@angular/core';
import { faFileLines, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { FileService } from '../../../infrastructure/services/FileService';
import type { FileResponse } from '../../../application/responses/file/FileResponse';

@Component({
  selector: 'app-import-datas-summary',
  templateUrl: './summary.html',
  imports: [FaIconComponent],
})
export class ImportDatasSummary {
  faFileLines = faFileLines;
  faDatabase = faDatabase;

  private fileService = inject(FileService);
  private router = inject(Router);

  readonly importFiles = this.fileService.importFiles;

  private paths = [
    '/cargas/importar/manual/nueva',
    '/cargas/importar/manual/nueva/formato',
    '/cargas/importar/manual/nueva/columnas',
    '/cargas/importar/manual/nueva/origen',
    '/cargas/importar/manual/nueva/confirmar',
  ];

  getStep(): number {
    return this.paths.indexOf(this.router.url) + 1;
  }

  getExtensions(files: FileResponse[]): string {
    const extensions = files
      .map((file) => file.fileName.split('.').pop()?.toLowerCase() ?? '')
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
