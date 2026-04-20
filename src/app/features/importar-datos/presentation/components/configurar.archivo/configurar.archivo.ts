import type { OnInit } from '@angular/core';
import { Component, inject, input, signal } from '@angular/core';
import { ProcessService } from '../../../infrastructure/services/process.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faAngleUp, faAngleDown, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-configure-file',
  templateUrl: './configurar.archivo.html',
  imports: [FaIconComponent, NgClass],
})
export class ConfigurarArchivo implements OnInit {
  private processService = inject(ProcessService);
  private http = inject(HttpClient);

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faFileLines = faFileLines;

  readonly files = this.processService.files;

  readonly file = input<{ id: string | null; size: number; file: File }>({
    id: null,
    size: 0,
    file: new File([], ''),
  });
  readonly index = input<number>(1);

  readonly isOpen = signal<boolean>(false);
  readonly spreadsheets = signal<string[]>([]);

  async ngOnInit() {
    if (this.getFileExtension(this.file().file) === 'XLSX') {
      const spreadsheets = await firstValueFrom(
        this.http.get<string[]>(`${environment.apiUrl}/import-file/${this.file().id}/spreadsheets`),
      );
      this.spreadsheets.update(() => spreadsheets);
    }
  }

  getFileExtension(file: File): string {
    return file.name.split('.').pop()?.toUpperCase() ?? '';
  }

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
