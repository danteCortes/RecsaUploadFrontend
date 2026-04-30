import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowUpFromBracket,
  faCheck,
  faFileLines,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ProcessService } from '../../../../importar-datos/infrastructure/services/ProcessService';
import { FileService } from '../../../../importar-datos/infrastructure/services/FileService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-template-subir-archivos',
  templateUrl: './subir.archivos.html',
  imports: [FaIconComponent, RouterLink],
})
export class TemplateSubirArchivos {
  faArrowUpFromBracket = faArrowUpFromBracket;
  faCheck = faCheck;
  faFileLines = faFileLines;
  faXmark = faXmark;

  private processService = inject(ProcessService);
  private fileService = inject(FileService);

  readonly files = this.fileService.files;
  readonly importFiles = this.fileService.importFiles;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.addFiles(input.files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) this.addFiles(event.dataTransfer.files);
  }

  async addFiles(fileList: FileList) {
    const processId = this.processService.process()?.id;
    if (!processId) return;

    const allowed = ['csv', 'xlsx', 'txt', 'xls', 'xml', 'json'];
    const newFiles = Array.from(fileList)
      .filter((f) => {
        const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
        return allowed.includes(ext);
      })
      .filter((nf) => !this.fileService.files().some((f) => f.name === nf.name));

    const response = await this.fileService.uploadFiles(newFiles, processId);

    this.importFiles.update((current) => [
      ...current,
      ...response.map((r) => ({
        id: r.id,
        fileName: r.fileName,
        fileFormat: r.fileFormat,
        fileSize: r.fileSize,
        storagePath: r.storagePath,
        decimalSeparator: r.decimalSeparator,
        fileEncoding: r.fileEncoding,
        fileDelimiter: r.fileDelimiter,
        spreadsheet: r.spreadsheet,
        processConfig: r.processConfig,
        firstRowHeaders: r.firstRowHeaders,
        key: r.key,
        position: r.position,
        validRows: r.validRows,
        duplicatedRows: r.duplicatedRows,
        errorRows: r.errorRows,
      })),
    ]);
  }

  async deleteFile(id: string) {
    await this.fileService.deleteFile(id);
    const processId = this.processService.process()?.id;
    if (processId) {
      const data = await this.processService.filesProcess(processId);
      this.importFiles.set(data);
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} Bytes`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  }

  getFileExtension(name: string): string {
    return name.split('.').pop()?.toUpperCase() ?? '';
  }
}
