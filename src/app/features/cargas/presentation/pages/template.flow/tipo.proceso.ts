import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faDiagramProject,
  faBuilding,
  faTag,
  faLayerGroup,
  faTruckLoading,
} from '@fortawesome/free-solid-svg-icons';
import { TemplateFlowService } from '../../../infrastructure/services/template.flow.service';

@Component({
  selector: 'app-tipo-proceso',
  templateUrl: './tipo.proceso.html',
  imports: [FaIconComponent, RouterLink],
})
export class TipoProceso {
  faCheck = faCheck;
  faDiagramProject = faDiagramProject;
  faBuilding = faBuilding;
  faTag = faTag;
  faLayerGroup = faLayerGroup;
  faTruckLoading = faTruckLoading;

  private templateFlowService = inject(TemplateFlowService);
  private router = inject(Router);

  readonly config = this.templateFlowService.selectedConfig;
  readonly selectedType = signal<'Flujo' | 'Refresco' | null>(null);

  selectType(type: 'Flujo' | 'Refresco'): void {
    this.selectedType.set(type);
  }

  isFormValid(): boolean {
    return this.selectedType() !== null;
  }

  siguiente(): void {
    const type = this.selectedType();
    if (!type) return;
    this.templateFlowService.setProcessType(type);
    this.router.navigate(['/cargas/importar/manual/template/confirmar']);
  }
}
