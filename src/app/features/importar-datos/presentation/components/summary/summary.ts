import { Component, computed, inject } from '@angular/core';
import {
  faFileLines,
  faKey,
  faWarning,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { FileService } from '../../../infrastructure/services/FileService';
import { ProcessService } from '../../../infrastructure/services/ProcessService';
import { SystemFieldService } from '../../../infrastructure/services/SystemFieldService';
import { CompanyService } from '../../../infrastructure/services/CompanyService';
import { LayoutService } from '../../../infrastructure/services/LayoutService';
import { LoadTypeService } from '../../../infrastructure/services/LoadTypeService';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-import-datas-summary',
  templateUrl: './summary.html',
  imports: [FaIconComponent, NgClass],
})
export class ImportDatasSummary {
  faFileLines = faFileLines;
  faKey = faKey;
  faWarning = faWarning;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  private fileService = inject(FileService);
  private processService = inject(ProcessService);
  private systemFieldService = inject(SystemFieldService);
  private companyService = inject(CompanyService);
  private layoutService = inject(LayoutService);
  private loadTypeService = inject(LoadTypeService);
  private router = inject(Router);

  readonly importFiles = this.fileService.importFiles;
  readonly process = this.processService.process;
  readonly systemFields = this.systemFieldService.systemFields;
  readonly companies = this.companyService.companies;
  readonly layouts = this.layoutService.layouts;
  readonly loadTypes = this.loadTypeService.loadTypes;

  readonly paths = [
    '/cargas/importar/manual/nueva',
    '/cargas/importar/manual/nueva/archivos',
    '/cargas/importar/manual/nueva/formato',
    '/cargas/importar/manual/nueva/columnas',
    '/cargas/importar/manual/nueva/confirmar',
  ];

  getStep(): number {
    const idx = this.paths.indexOf(this.router.url);
    return idx === -1 ? 1 : idx + 1;
  }

  getPercent(): number {
    return this.getStep() * 20;
  }

  // Lookup helpers
  readonly companyName = computed(() => {
    const id = this.process()?.company;
    if (!id) return null;
    return this.companies().find((c) => c.id === id)?.name ?? id;
  });

  readonly layoutName = computed(() => {
    const id = this.process()?.layout;
    if (!id) return null;
    return this.layouts().find((l) => l.id === id)?.name ?? id;
  });

  readonly loadTypeName = computed(() => {
    const id = this.process()?.loadType;
    if (!id) return null;
    return this.loadTypes().find((l) => l.id === id)?.name ?? id;
  });

  readonly responsible = computed(() => this.process()?.responsible ?? null);

  // File info
  readonly fileCount = computed(() => this.importFiles().length);

  readonly fileExtensions = computed(() => {
    const exts = this.importFiles()
      .map((f) => f.fileName.split('.').pop()?.toUpperCase() ?? '')
      .filter((e) => e !== '');
    return [...new Set(exts)].join(', ') || '-';
  });

  readonly delimiter = computed(() => {
    const d = this.importFiles()[0]?.fileDelimiter;
    return d ?? null;
  });

  readonly hasHeaders = computed(() => {
    const f = this.importFiles()[0];
    if (!f) return null;
    return f.firstRowHeaders;
  });

  readonly requiredFields = computed(() => this.systemFields().filter((f) => f.required));

  readonly keyColumn = computed(() => this.importFiles()[0]?.key ?? null);

  // Validation (sum across all files)
  readonly validRows = computed(() =>
    this.importFiles().reduce((sum, f) => sum + (f.validRows ?? 0), 0),
  );

  readonly errorRows = computed(() =>
    this.importFiles().reduce((sum, f) => sum + (f.errorRows ?? 0), 0),
  );

  readonly hasValidationData = computed(() =>
    this.importFiles().some((f) => (f.validRows ?? 0) > 0 || (f.errorRows ?? 0) > 0),
  );

  readonly hasWarnings = computed(() =>
    this.importFiles().some((f) => (f.errorRows ?? 0) > 0 || (f.duplicatedRows ?? 0) > 0),
  );

  readonly hasProcessConfig = computed(
    () => !!(this.companyName() || this.layoutName() || this.loadTypeName()),
  );
}
