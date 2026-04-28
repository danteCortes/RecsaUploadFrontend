import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faAngleLeft,
  faCheckCircle,
  faCircleXmark,
  faCopy,
  faPaperPlane,
  faFileLines,
  faKey,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { FileService } from '../../../infrastructure/services/FileService';

@Component({
  selector: 'app-confirmar-importacion',
  templateUrl: './confirmar.importacion.html',
  imports: [FaIconComponent, NgClass, RouterLink],
})
export class ConfirmarImportacion {
  faAngleLeft = faAngleLeft;
  faCheckCircle = faCheckCircle;
  faCircleXmark = faCircleXmark;
  faCopy = faCopy;
  faPaperPlane = faPaperPlane;
  faFileLines = faFileLines;
  faKey = faKey;
  faWarning = faWarning;

  private fileService = inject(FileService);
  private router = inject(Router);

  readonly importFiles = this.fileService.importFiles;

  readonly totalValidRows = computed(() =>
    this.importFiles().reduce((sum, f) => sum + (f.validRows ?? 0), 0),
  );

  readonly totalErrorRows = computed(() =>
    this.importFiles().reduce((sum, f) => sum + (f.errorRows ?? 0), 0),
  );

  readonly totalDuplicatedRows = computed(() =>
    this.importFiles().reduce((sum, f) => sum + (f.duplicatedRows ?? 0), 0),
  );

  readonly hasWarnings = computed(
    () => this.totalErrorRows() > 0 || this.totalDuplicatedRows() > 0,
  );

  getFileExtension(name: string): string {
    return name.split('.').pop()?.toUpperCase() ?? '';
  }

  async procesarImportacion(): Promise<void> {
    // Navegar al dashboard o bitácora después de procesar
    await this.router.navigate(['/cargas/bitacora']);
  }
}
