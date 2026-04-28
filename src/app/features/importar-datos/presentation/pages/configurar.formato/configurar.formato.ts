import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faSliders,
  faHashtag,
  faAngleUp,
  faAngleDown,
  faAngleLeft,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { ConfigurarArchivo } from '../../components/configurar.archivo/configurar.archivo';
import { FileService } from '../../../infrastructure/services/FileService';
import { FilePreview } from '../../components/file.preview/file.preview';
import type { FileResponse } from '../../../application/responses/file/FileResponse';

@Component({
  selector: 'app-configurar-datos',
  templateUrl: './configurar.formato.html',
  imports: [FaIconComponent, RouterLink, ConfigurarArchivo, FilePreview],
})
export class ConfigurarFormato {
  faSliders = faSliders;
  faHashtag = faHashtag;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faAngleLeft = faAngleLeft;
  faCheck = faCheck;

  private fileService: FileService = inject(FileService);

  readonly importFiles = this.fileService.importFiles;

  allConfigured(): boolean {
    const files = this.importFiles();
    if (files.length === 0) return false;
    return files.every((file) => this.isFileConfigured(file));
  }

  private isFileConfigured(file: FileResponse): boolean {
    if (file.fileFormat === 'XLSX') {
      return !!(file.decimalSeparator && file.fileEncoding && file.spreadsheet);
    } else if (file.fileFormat === 'CSV' || file.fileFormat === 'TXT') {
      return !!(file.decimalSeparator && file.fileEncoding && file.fileDelimiter);
    } else {
      return !!(file.decimalSeparator && file.fileEncoding);
    }
  }
}
