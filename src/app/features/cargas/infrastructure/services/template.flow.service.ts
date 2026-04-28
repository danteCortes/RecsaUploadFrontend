import { Injectable, signal } from '@angular/core';

export interface TemplateConfig {
  codigo: string;
  empresa: string;
  templateName: string;
  interfaz: string;
  tipoCarga: string;
  responsable: string;
}

@Injectable({ providedIn: 'root' })
export class TemplateFlowService {
  readonly selectedConfig = signal<TemplateConfig | null>(null);
  readonly processType = signal<'Flujo' | 'Refresco' | null>(null);

  setConfig(config: TemplateConfig): void {
    this.selectedConfig.set(config);
    this.processType.set(null);
  }

  setProcessType(type: 'Flujo' | 'Refresco'): void {
    this.processType.set(type);
  }

  reset(): void {
    this.selectedConfig.set(null);
    this.processType.set(null);
  }
}
