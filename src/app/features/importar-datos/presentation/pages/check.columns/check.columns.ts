import { Component, computed, effect, inject, signal } from '@angular/core';
import { FileService } from '../../../infrastructure/services/FileService';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faDatabase,
  faKey,
  faWarning,
  faFileLines,
  faArrowRight,
  faCheckCircle,
  faAngleLeft,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { SystemFieldService } from '../../../infrastructure/services/SystemFieldService';
import type { FileResponse } from '../../../application/responses/file/FileResponse';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ColumnAssignmentService } from '../../../infrastructure/services/ColumnAssignmentService';

@Component({
  selector: 'app-check-columns',
  templateUrl: './check.columns.html',
  imports: [FaIconComponent, NgClass, RouterLink],
})
export class CheckColumns {
  constructor() {
    effect(() => {
      const files = this.importFiles();
      if (files.length > 0 && this.currentFile() === null) {
        this.currentFile.set(files[0]);
      }

      (async () => {
        const currentFile = this.currentFile();
        if (currentFile) {
          const fileId = currentFile.id;
          if (fileId) {
            const [systemFields, previewFile] = await Promise.all([
              this.systemFieldService.listSystemFields(),
              this.fileService.previewFile(fileId),
            ]);

            this.systemFields.set(systemFields);
            this.columns.set(previewFile.headers);
            this.rows.set(previewFile.data);
          }
        }

        if (this.importFiles().length > 0) {
          const columnAssignments = (
            await Promise.all(
              this.importFiles()
                .filter((item) => item.id)
                .map((item) => this.fileService.getColumnAssignmentsByFile(item.id!)),
            )
          ).flat();

          this.columnAssignments.set(columnAssignments);
        }
      })();
    });
  }

  readonly faDatabase = faDatabase;
  readonly faKey = faKey;
  readonly faWarning = faWarning;
  readonly faFileLines = faFileLines;
  readonly faArrowRight = faArrowRight;
  readonly faCheckCircle = faCheckCircle;
  readonly faAngleLeft = faAngleLeft;
  readonly faCheck = faCheck;

  private fileService: FileService = inject(FileService);
  private systemFieldService: SystemFieldService = inject(SystemFieldService);
  private columnAssignmentService: ColumnAssignmentService = inject(ColumnAssignmentService);

  readonly importFiles = this.fileService.importFiles;
  readonly columnAssignments = this.fileService.columnAssignments;
  readonly systemFields = this.systemFieldService.systemFields;

  readonly currentFile = signal<FileResponse | null>(null);
  readonly columns = signal<string[]>([]);
  readonly rows = signal<string[][]>([]);

  readonly activeFile = computed(() => this.currentFile() ?? this.importFiles()[0] ?? null);

  columnValue(column: string): string {
    const columnAssignments = this.columnAssignments();
    if (columnAssignments.length === 0) return '';

    const system_field_id =
      columnAssignments.find((col) => col.column_name === column)?.system_field_id ?? '';

    return system_field_id;
  }

  columnLabel(column: string): string {
    const columnAssignments = this.columnAssignments();
    if (columnAssignments.length === 0) return '';

    const system_field_id =
      columnAssignments.find((col) => col.column_name === column)?.system_field_id ?? '';

    const system_field_value =
      this.systemFields().find((field) => field.id === system_field_id)?.name ?? '';

    return system_field_value;
  }

  unmappedRequiredFiles(): number {
    const requiredFields = this.systemFields().reduce(
      (acc, item) => {
        if (item.required) acc.push(item);

        return acc;
      },
      [] as {
        id: string;
        name: string;
        column: string;
        required: boolean;
        position: number;
      }[],
    );

    return requiredFields.reduce(
      (acc, item) =>
        !this.columnAssignments().some((col) => col.system_field_id === item.id) ? acc + 1 : acc,
      0,
    );
  }

  requiredSystemFields(): number {
    return this.systemFields().reduce((acc, item) => (item.required ? acc + 1 : acc), 0);
  }

  async saveColumnAssignment(e: Event, column: string): Promise<void> {
    const system_field_id = (e.target as HTMLSelectElement).value;
    if (!system_field_id) return;

    const currentFile = this.currentFile();
    if (!currentFile?.id) return;

    const exists = this.columnAssignments().find((col) => col.system_field_id === system_field_id);
    if (exists) {
      const data = await this.columnAssignmentService.updateColumnAssignment(
        {
          import_file_id: currentFile.id,
          column_name: column,
          system_field_id: system_field_id,
        },
        exists.id,
      );

      this.columnAssignments.update((assignments) =>
        assignments.map((a) => (a.id === exists.id ? data : a)),
      );
    } else {
      const data = await this.columnAssignmentService.saveColumnAssignment({
        import_file_id: currentFile.id,
        column_name: column,
        system_field_id: system_field_id,
      });

      this.columnAssignments.update((assignments) => [...assignments, data]);
    }
  }

  async setKeyFile(column: string): Promise<void> {
    const currentFile = this.currentFile();
    if (!currentFile?.id) return;

    const data = await this.fileService.updateFile({ ...currentFile, key: column }, currentFile.id);

    this.currentFile.set(data);
    this.importFiles.update((files) => files.map((f) => (f.id === data.id ? data : f)));
  }

  canContinue(): boolean {
    if (
      this.unmappedRequiredFiles() === 0 &&
      !this.importFiles().some((file) => file.key === null)
    ) {
      return false;
    } else {
      return true;
    }
  }
}
