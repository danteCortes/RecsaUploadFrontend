import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProcessService } from '../../../infrastructure/services/ProcessService';
import { ImportarDatosHeader } from '../../components/header/header';
import { ImportDatasSummary } from '../../components/summary/summary';
import { FileService } from '../../../infrastructure/services/FileService';

@Component({
  selector: 'app-importar-datos-index',
  templateUrl: './index.html',
  imports: [RouterOutlet, ImportarDatosHeader, ImportDatasSummary],
})
export class ImportarDatosIndex implements OnInit {
  private processService: ProcessService = inject(ProcessService);
  private fileService: FileService = inject(FileService);

  readonly importFiles = this.fileService.importFiles;
  readonly process = this.processService.process;

  async ngOnInit() {
    const processId = localStorage.getItem('process_id');
    if (processId) {
      const [files, process] = await Promise.all([
        this.processService.filesProcess(processId),
        this.processService.showProcess(processId),
      ]);
      this.process.set(process);
      this.fileService.importFiles.set(files);
    } else {
      const response = await this.processService.saveProcess({
        company: null,
        layout: null,
        load_type: null,
        process_type: null,
        responsible: null,
      });
      localStorage.setItem('process_id', response.id ?? '');
      this.process.set(response);
    }
  }
}
