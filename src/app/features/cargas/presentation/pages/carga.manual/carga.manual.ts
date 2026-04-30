import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faMagnifyingGlass,
  faFileLines,
  faPen,
  faDownload,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { TemplateFlowService } from '../../../infrastructure/services/template.flow.service';

interface ConfiguracionCarga {
  codigo: string;
  empresa: string;
  templateName: string;
  pais: string;
  responsable: string;
  activo: boolean;
}

@Component({
  selector: 'app-carga-manual',
  templateUrl: './carga.manual.html',
  imports: [RouterLink, FaIconComponent],
})
export class CargaManual {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faFileLines = faFileLines;
  readonly faPen = faPen;
  readonly faDownload = faDownload;
  readonly faArrowUpFromBracket = faArrowUpFromBracket;

  private router = inject(Router);
  private templateFlowService = inject(TemplateFlowService);

  readonly configuraciones = signal<ConfiguracionCarga[]>([
    {
      codigo: 'EMP001',
      empresa: 'Empresa Demo S.A.',
      templateName: 'Template Clientes Argentina',
      pais: 'Argentina',
      responsable: 'Juan Pérez',
      activo: true,
    },
    {
      codigo: 'EMP002',
      empresa: 'Servicios Integrales Ltda.',
      templateName: 'Template Deuda Chile',
      pais: 'Chile',
      responsable: 'María González',
      activo: true,
    },
    {
      codigo: 'EMP003',
      empresa: 'Tecnología Avanzada Inc.',
      templateName: 'Template Pagos México',
      pais: 'México',
      responsable: 'Carlos Rodríguez',
      activo: false,
    },
  ]);

  readonly total = computed(() => this.configuraciones().length);
  readonly activas = computed(() => this.configuraciones().filter((c) => c.activo).length);
  readonly inactivas = computed(() => this.configuraciones().filter((c) => !c.activo).length);

  toggleEstado(codigo: string): void {
    this.configuraciones.update((items) =>
      items.map((item) => (item.codigo === codigo ? { ...item, activo: !item.activo } : item)),
    );
  }

  cargarArchivo(config: ConfiguracionCarga): void {
    this.templateFlowService.setConfig({
      codigo: config.codigo,
      empresa: config.empresa,
      templateName: config.templateName,
      interfaz: 'ASIGNACION',
      tipoCarga: 'Clientes',
      responsable: config.responsable,
    });
    this.router.navigate(['/cargas/importar/manual/template']);
  }
}
