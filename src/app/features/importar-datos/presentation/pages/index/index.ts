import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { ProcessService } from '../../../infrastructure/services/process.service';

@Component({
  selector: 'app-importar-datos-index',
  templateUrl: './index.html',
  imports: [FaIconComponent, RouterOutlet],
})
export class ImportarDatosIndex implements OnInit {
  private service: ProcessService = inject(ProcessService);

  readonly files = this.service.files;

  faArrowUpFromBracket = faArrowUpFromBracket;
  faCog = faCog;
  faCheckSquare = faCheckSquare;
  faDatabase = faDatabase;
  faPaperPlane = faPaperPlane;
  faCheck = faCheck;
  faFileLines = faFileLines;
  faXmark = faXmark;

  async ngOnInit() {
    const processId = localStorage.getItem('process_id');
    if (processId) {
      console.log('Acá buscamos los archivos');
      const data = await this.service.getFiles(processId);
      this.service.files.set(data.map((f) => new File([], f.name)));
    } else {
      console.log('Acá buscamos un proceso guardado, si no hay creamos uno.');
      const process = await this.service.save({
        company: null,
        layout: null,
        load_type: null,
        process_type: null,
        responsible: null,
      });
      localStorage.setItem('process_id', process.id);
    }
  }

  getExtensions(files: File[]): string {
    const extensions = files
      .map((file) => file.name.split('.').pop()?.toLowerCase() ?? '')
      .filter((ext) => ext !== '');

    const unique = Array.from(new Set(extensions));

    return unique.map((ext) => ext.toUpperCase()).join(', ');
  }
}
