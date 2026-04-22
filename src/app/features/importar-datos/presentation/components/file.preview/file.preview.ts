import { Component, effect, inject, input, signal } from '@angular/core';
import { FileService } from '../../../infrastructure/services/FileService';
import type { FileResponse } from '../../../application/responses/file/FileResponse';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file.preview.html',
  imports: [FaIconComponent],
})
export class FilePreview {
  readonly faFileLines = faFileLines;

  private fileService: FileService = inject(FileService);

  readonly imporFiles = this.fileService.importFiles;

  readonly file = input<FileResponse>({
    id: null,
    fileName: '',
    fileFormat: '',
    fileSize: 0,
    storagePath: '',
    decimalSeparator: null,
    fileEncoding: null,
    fileDelimiter: null,
    spreadsheet: null,
    processConfig: '',
    firstRowHeaders: true,
    key: null,
    position: null,
    validRows: 0,
    duplicatedRows: 0,
    errorRows: 0,
  });

  readonly filePreview = signal<{ headers: string[]; data: string[][] }>({ headers: [], data: [] });

  constructor() {
    effect(async () => {
      if (this.isConfigured()) {
        console.log('buscamos file preview de ' + this.file().fileName);
        const data = await this.fileService.previewFile(this.file().id!);

        this.filePreview.set(data);
      }
    });
  }

  getFileExtension(name: string): string {
    return name.split('.').pop()?.toUpperCase() ?? '';
  }

  isConfigured(): boolean {
    if (this.file().fileFormat === 'XLSX') {
      if (this.file().decimalSeparator && this.file().fileEncoding && this.file().spreadsheet) {
        return true;
      }
    } else if (this.file().fileFormat === 'CSV' || this.file().fileFormat === 'TXT') {
      if (this.file().decimalSeparator && this.file().fileEncoding && this.file().fileDelimiter) {
        return true;
      }
    } else {
      if (this.file().decimalSeparator && this.file().fileEncoding) {
        return true;
      }
    }
    return false;
  }
}
