import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { ProcessService } from '../../../infrastructure/services/ProcessService';
import { ImportarDatosHeader } from '../../components/header/header';
import { ImportDatasSummary } from '../../components/summary/summary';
import { FileService } from '../../../infrastructure/services/FileService';

@Component({
  selector: 'app-importar-datos-index',
  templateUrl: './index.html',
  imports: [RouterOutlet, RouterLink, ImportarDatosHeader, ImportDatasSummary],
})
export class ImportarDatosIndex implements OnInit {
  private processService: ProcessService = inject(ProcessService);
  private fileService: FileService = inject(FileService);
  private route = inject(ActivatedRoute);

  readonly importFiles = this.fileService.importFiles;
  readonly process = this.processService.process;

  readonly pageTitle = signal('Importador de Datos');
  readonly pageSubtitle = signal('Cargá y procesá tus archivos en pocos pasos');
  readonly backLink = signal<string | null>(null);
  readonly backText = signal('Volver');

  async ngOnInit() {
    const data = this.route.snapshot.data;
    if (data['title']) this.pageTitle.set(data['title']);
    if (data['subtitle']) this.pageSubtitle.set(data['subtitle']);
    if (data['backLink']) this.backLink.set(data['backLink']);
    if (data['backText']) this.backText.set(data['backText']);

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
