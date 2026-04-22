import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
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
import { ProcessService } from '../../../infrastructure/services/ProcessService';
import { RouterLink } from '@angular/router';
import { SaveProcessRequest } from '../../../infrastructure/requests/SaveProcessRequest';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs/operators';
import { ConfigurarArchivo } from '../../components/configurar.archivo/configurar.archivo';
import { FileService } from '../../../infrastructure/services/FileService';
import type { ProcessResponse } from '../../../application/responses/process/ProcessResponse';
import { CompanyService } from '../../../infrastructure/services/CompanyService';
import { LoadTypeService } from '../../../infrastructure/services/LoadTypeService';
import { ProcessTypeService } from '../../../infrastructure/services/ProcessTypeService';
import { LayoutService } from '../../../infrastructure/services/LayoutService';

@Component({
  selector: 'app-configurar-datos',
  templateUrl: './configurar.formato.html',
  imports: [FaIconComponent, RouterLink, FormsModule, ConfigurarArchivo],
})
export class ConfigurarFormato implements OnInit {
  constructor() {
    // Convertir la señal a Observable
    toObservable(this.process)
      .pipe(
        // Filtrar solo cuando NO sea null
        filter(
          (process): process is ProcessResponse & { id: string } =>
            process !== null && process.id !== null,
        ),
        // Hacer la petición cada vez que cambie el ID
        switchMap((process) => this.processService.showProcess(process.id)),
      )
      .subscribe(() => {
        this.form.set({
          company: this.process()?.company ?? '',
          load_type: this.process()?.loadType ?? '',
          layout_name: this.process()?.layout ?? '',
          process_type: this.process()?.processType ?? '',
          responsible: this.process()?.responsible ?? '',
        });
      });

    this.form.set({
      company: this.process()?.company ?? '',
      load_type: this.process()?.loadType ?? '',
      layout_name: this.process()?.layout ?? '',
      process_type: this.process()?.processType ?? '',
      responsible: this.process()?.responsible ?? '',
    });
  }

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

  private processService: ProcessService = inject(ProcessService);
  private fileService: FileService = inject(FileService);
  private companyService: CompanyService = inject(CompanyService);
  private loadTypeService: LoadTypeService = inject(LoadTypeService);
  private processTypeService: ProcessTypeService = inject(ProcessTypeService);
  private layoutService: LayoutService = inject(LayoutService);

  readonly importFiles = this.fileService.importFiles;
  readonly process = this.processService.process;

  readonly companies = this.companyService.companies;
  readonly loadTypes = this.loadTypeService.loadTypes;
  readonly processTypes = this.processTypeService.processTypes;
  readonly layouts = this.layoutService.layouts;

  spinSave = signal<boolean>(false);

  readonly form = signal<{
    company: string;
    load_type: string;
    process_type: string;
    layout_name: string;
    responsible: string;
  }>({
    company: '',
    load_type: '',
    process_type: '',
    layout_name: '',
    responsible: '',
  });

  async ngOnInit() {
    const [companies, loadTypes, layouts, processTypes] = await Promise.all([
      this.companyService.getCompanies(),
      this.loadTypeService.getLoadTypes(),
      this.layoutService.getLayouts(),
      this.processTypeService.getProcessTypes(),
    ]);

    this.companies.set(companies);
    this.loadTypes.set(loadTypes);
    this.layouts.set(layouts);
    this.processTypes.set(processTypes);
  }

  getFileExtension(name: string): string {
    return name.split('.').pop()?.toUpperCase() ?? '';
  }

  async configureProcess(): Promise<void> {
    const id = this.process()?.id;
    if (!id) return;

    const request = new SaveProcessRequest(
      this.form().company,
      this.form().load_type,
      this.form().process_type,
      this.form().layout_name,
      this.form().responsible,
    );

    await this.processService.updateProcess(request, id);

    this.spinSave.set(true);
    setInterval(() => this.spinSave.set(false), 1000);
  }
}
