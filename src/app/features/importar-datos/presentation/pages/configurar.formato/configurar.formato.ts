import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCity,
  faDiagramProject,
  faArrowUpFromBracket,
  faDatabase,
  faSave,
  faSliders,
  faHashtag,
  faAngleUp,
  faAngleDown,
  faFileLines,
  faAngleLeft,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ProcessService } from '../../../infrastructure/services/process.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-configurar-datos',
  templateUrl: './configurar.formato.html',
  imports: [FaIconComponent, RouterLink],
})
export class ConfigurarFormato {
  faDiagramProject = faDiagramProject;
  faCity = faCity;
  faArrowUpFromBracket = faArrowUpFromBracket;
  faDatabase = faDatabase;
  faSave = faSave;
  faSliders = faSliders;
  faHashtag = faHashtag;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faFileLines = faFileLines;
  faAngleLeft = faAngleLeft;
  faCheck = faCheck;

  private processService = inject(ProcessService);

  readonly files = this.processService.files;

  getFileExtension(file: File): string {
    return file.name.split('.').pop()?.toUpperCase() ?? '';
  }
}
