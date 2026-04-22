import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowUpFromBracket,
  faCheck,
  faCheckSquare,
  faCog,
  faDatabase,
  faPaperPlane,
  faFileLines,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ProcessService } from '../../../infrastructure/services/ProcessService';
import { FileService } from '../../../infrastructure/services/FileService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-importar-datos',
  templateUrl: './importar.datos.html',
  imports: [FaIconComponent, RouterLink],
})
export class ImportarDatos {
  faArrowUpFromBracket = faArrowUpFromBracket;
  faCog = faCog;
  faCheckSquare = faCheckSquare;
  faDatabase = faDatabase;
  faPaperPlane = faPaperPlane;
  faCheck = faCheck;
  faFileLines = faFileLines;
  faXmark = faXmark;

  private processService: ProcessService = inject(ProcessService);
  private fileService: FileService = inject(FileService);

  readonly files = this.fileService.files;
  readonly importFiles = this.fileService.importFiles;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  async addFiles(fileList: FileList) {
    const processId = this.processService.process()?.id;
    if (!processId) return;

    const allowedExtensions = ['xml', 'csv', 'json', 'xlsx', 'txt'];

    const newFiles = Array.from(fileList);

    const validFiles = newFiles.filter((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      return allowedExtensions.includes(ext);
    });

    const uniqueFiles = validFiles.filter(
      (newFile) => !this.files().some((f) => f.name === newFile.name),
    );

    const response = await this.fileService.uploadFiles(uniqueFiles, processId);

    this.importFiles.update((current) => [
      ...current,
      ...response.map((fileResponse) => ({
        id: fileResponse.id,
        fileName: fileResponse.fileName,
        fileFormat: fileResponse.fileFormat,
        fileSize: fileResponse.fileSize,
        storagePath: fileResponse.storagePath,
        decimalSeparator: fileResponse.decimalSeparator,
        fileEncoding: fileResponse.fileEncoding,
        fileDelimiter: fileResponse.fileDelimiter,
        spreadsheet: fileResponse.spreadsheet,
        processConfig: fileResponse.processConfig,
        firstRowHeaders: fileResponse.firstRowHeaders,
        key: fileResponse.key,
        position: fileResponse.position,
        validRows: fileResponse.validRows,
        duplicatedRows: fileResponse.duplicatedRows,
        errorRows: fileResponse.errorRows,
      })),
    ]);
  }

  async deleteFile(id: string) {
    const processId = this.processService.process()?.id;
    if (!processId) return;

    await this.fileService.deleteFile(id);

    const data = await this.processService.filesProcess(processId);

    this.importFiles.set(data);
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} Bytes`;
    }

    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(2)} KB`;
    }

    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
  }

  getFileExtension(name: string): string {
    return name.split('.').pop()?.toUpperCase() ?? '';
  }
}
