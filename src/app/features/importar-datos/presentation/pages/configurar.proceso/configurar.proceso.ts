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
import { CountryService } from '../../../infrastructure/services/CountryService';
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
  private countryService = inject(CountryService);
  private layoutService = inject(LayoutService);
  private router = inject(Router);

  readonly process = this.processService.process;
  readonly companies = this.companyService.companies;
  readonly countries = this.countryService.countries;
  readonly layouts = this.layoutService.layouts;

  spinSave = signal<boolean>(false);

  readonly form = signal<{
    country: string;
    company: string;
    process_type: string;
    layout_name: string;
    responsible: string;
    template_name: string;
  }>({
    country: '',
    company: '',
    process_type: '',
    layout_name: '',
    responsible: '',
    template_name: '',
  });

  async ngOnInit() {
    try {
      const [countries, layouts] = await Promise.all([
        this.countryService.getCountries(),
        this.layoutService.getLayouts(),
      ]);

      this.countries.set(countries);
      this.layouts.set(layouts);
    } catch (e) {
      console.error('Error cargando datos del proceso:', e);
    }

    // Pre-fill if process already configured
    const p = this.process();
    if (p) {
      this.form.set({
        country: '',
        company: p.company ?? '',
        process_type: p.loadType ?? '',
        layout_name: p.layout ?? '',
        responsible: p.responsible ?? '',
        template_name: p.processType ?? '',
      });
      // Si ya tiene empresa, carga todas para mostrar la selección previa
      if (p.company) {
        try {
          const companies = await this.companyService.getCompanies();
          this.companies.set(companies);
        } catch (e) {
          console.error('Error cargando empresas:', e);
        }
      }
    }
  }

  isFormValid(): boolean {
    const f = this.form();
    return !!(f.company && f.process_type && f.layout_name && f.responsible);
  }

  async onCountryChange(countryId: string): Promise<void> {
    this.form.update((f) => ({ ...f, company: '' }));
    if (!countryId) {
      this.companies.set([]);
      return;
    }
    try {
      const companies = await this.companyService.getCompaniesByCountry(countryId);
      this.companies.set(companies);
    } catch (e) {
      console.error('Error cargando empresas por país:', e);
      this.companies.set([]);
    }
  }

  async saveAndContinue(): Promise<void> {
    const id = this.process()?.id;
    if (!id) return;

    const request = new SaveProcessRequest(
      this.form().company,
      this.form().process_type,
      this.form().template_name || null,
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
