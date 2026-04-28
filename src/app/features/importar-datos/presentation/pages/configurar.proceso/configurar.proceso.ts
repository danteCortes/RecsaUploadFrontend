import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCity,
  faArrowUpFromBracket,
  faDatabase,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { ProcessService } from '../../../infrastructure/services/ProcessService';
import { Router } from '@angular/router';
import { SaveProcessRequest } from '../../../infrastructure/requests/SaveProcessRequest';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../infrastructure/services/CompanyService';
import { LoadTypeService } from '../../../infrastructure/services/LoadTypeService';
import { LayoutService } from '../../../infrastructure/services/LayoutService';

@Component({
  selector: 'app-configurar-proceso',
  templateUrl: './configurar.proceso.html',
  imports: [FaIconComponent, FormsModule],
})
export class ConfigurarProceso implements OnInit {
  faCity = faCity;
  faArrowUpFromBracket = faArrowUpFromBracket;
  faDatabase = faDatabase;
  faAngleRight = faAngleRight;

  private processService = inject(ProcessService);
  private companyService = inject(CompanyService);
  private loadTypeService = inject(LoadTypeService);
  private layoutService = inject(LayoutService);
  private router = inject(Router);

  readonly process = this.processService.process;
  readonly companies = this.companyService.companies;
  readonly loadTypes = this.loadTypeService.loadTypes;
  readonly layouts = this.layoutService.layouts;

  spinSave = signal<boolean>(false);

  readonly form = signal<{
    company: string;
    load_type: string;
    layout_name: string;
    responsible: string;
    template_name: string;
  }>({
    company: '',
    load_type: '',
    layout_name: '',
    responsible: '',
    template_name: '',
  });

  async ngOnInit() {
    try {
      const [companies, loadTypes, layouts] = await Promise.all([
        this.companyService.getCompanies(),
        this.loadTypeService.getLoadTypes(),
        this.layoutService.getLayouts(),
      ]);

      this.companies.set(companies);
      this.loadTypes.set(loadTypes);
      this.layouts.set(layouts);
    } catch (e) {
      console.error('Error cargando datos del proceso:', e);
    }

    // Pre-fill if process already configured
    const p = this.process();
    if (p) {
      this.form.set({
        company: p.company ?? '',
        load_type: p.loadType ?? '',
        layout_name: p.layout ?? '',
        responsible: p.responsible ?? '',
        template_name: '',
      });
    }
  }

  isFormValid(): boolean {
    const f = this.form();
    return !!(f.company && f.load_type && f.layout_name && f.responsible);
  }

  async saveAndContinue(): Promise<void> {
    const id = this.process()?.id;
    if (!id) return;

    const request = new SaveProcessRequest(
      this.form().company,
      this.form().load_type,
      null,
      this.form().layout_name,
      this.form().responsible,
    );

    const response = await this.processService.updateProcess(request, id);

    this.process.set({
      id: response.id,
      company: response.company,
      loadType: response.loadType,
      processType: response.processType,
      layout: response.layout,
      responsible: response.responsible,
    });

    this.spinSave.set(true);
    setTimeout(() => {
      this.spinSave.set(false);
      this.router.navigate(['/cargas/importar/manual/nueva/archivos']);
    }, 600);
  }
}
