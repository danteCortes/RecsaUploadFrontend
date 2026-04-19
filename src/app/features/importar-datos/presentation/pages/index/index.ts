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
}
