import type { OnInit } from '@angular/core';
import { Component, inject, input, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faAngleUp,
  faAngleDown,
  faFileLines,
  faSave,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../../infrastructure/services/FileService';
import type { FileResponse } from '../../../application/responses/file/FileResponse';

@Component({
  selector: 'app-configure-file',
  templateUrl: './configurar.archivo.html',
  imports: [FaIconComponent, NgClass, FormsModule],
})
export class ConfigurarArchivo implements OnInit {
  private fileService = inject(FileService);
  private http = inject(HttpClient);

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faFileLines = faFileLines;
  faSave = faSave;
  faCheck = faCheck;

  readonly importFiles = this.fileService.importFiles;

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
  readonly index = input<number>(1);

  readonly isMoving = signal(false);
  readonly isOpen = signal<boolean>(false);
  readonly isSave = signal<boolean>(false);
  readonly spreadsheets = signal<string[]>([]);
  readonly form = signal<{
    delimiter: string;
    encoding: string;
    separator: string;
    spreadsheet: string;
    firstRowHeaders: boolean;
  }>({
    separator: ',',
    delimiter: ';',
    encoding: 'UTF-8',
    spreadsheet: '',
    firstRowHeaders: true,
  });

  async ngOnInit() {
    if (this.getFileExtension(this.file().fileName) === 'XLSX') {
      const spreadsheets = await firstValueFrom(
        this.http.get<string[]>(`${environment.apiUrl}/import-file/${this.file().id}/spreadsheets`),
      );
      this.spreadsheets.update(() => spreadsheets);
      this.form.update(() => ({
        delimiter: '',
        encoding: 'UTF-8',
        separator: ',',
        spreadsheet: spreadsheets.length > 0 ? spreadsheets[0] : '',
        firstRowHeaders: true,
      }));
    } else if (
      this.getFileExtension(this.file().fileName) === 'CSV' ||
      this.getFileExtension(this.file().fileName) === 'TXT'
    ) {
      this.form.update(() => ({
        delimiter: ';',
        encoding: 'UTF-8',
        separator: ',',
        spreadsheet: '',
        firstRowHeaders: true,
      }));
    } else {
      this.form.update(() => ({
        delimiter: '',
        encoding: 'UTF-8',
        separator: ',',
        spreadsheet: '',
        firstRowHeaders: true,
      }));
    }
  }

  getFileExtension(name: string): string {
    return name.split('.').pop()?.toUpperCase() ?? '';
  }

  toggle() {
    this.isOpen.update((v) => !v);
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

  async updateConfigurationFile(): Promise<void> {
    const id = this.file().id;
    if (!id) throw new Error('El archivo no tiene un id');

    const data = await this.fileService.updateFile(
      {
        ...this.file(),
        decimalSeparator: this.form().separator,
        fileDelimiter: this.form().delimiter,
        fileEncoding: this.form().encoding,
        spreadsheet: this.form().spreadsheet,
        firstRowHeaders: this.form().firstRowHeaders,
        position: this.index() + 1,
      },
      id,
    );
    this.fileService.updateImportFile(data);

    this.isSave.set(true);

    setTimeout(() => this.isSave.set(false), 1000);
  }

  async changePosition(): Promise<void> {
    const id = this.file().id;
    if (!id) throw new Error('El archivo no tiene un id');

    const data = await this.fileService.updateFile(
      {
        ...this.file(),
        decimalSeparator: this.form().separator,
        fileDelimiter: this.form().delimiter,
        fileEncoding: this.form().encoding,
        spreadsheet: this.form().spreadsheet,
        firstRowHeaders: this.form().firstRowHeaders,
        position: this.index() + 1,
      },
      id,
    );
    this.fileService.updateImportFile(data);

    this.isSave.set(true);

    setTimeout(() => this.isSave.set(false), 1000);
  }

  async moveUp() {
    if (this.index() > 0 && !this.isMoving()) {
      this.isMoving.set(true);
      await this.fileService.swapFiles(this.index(), this.index() - 1);
      this.isMoving.set(false);
    }
  }

  async moveDown() {
    if (this.index() < this.fileService.importFiles().length - 1 && !this.isMoving()) {
      this.isMoving.set(true);
      await this.fileService.swapFiles(this.index(), this.index() + 1);
      this.isMoving.set(false);
    }
  }
}
