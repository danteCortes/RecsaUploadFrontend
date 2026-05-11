import { Component, computed, inject, type OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowUpFromBracket,
  faDiagramProject,
  faPaperPlane,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { TemplateFlowService } from '../../../infrastructure/services/template.flow.service';
import { FileService } from '../../../../importar-datos/infrastructure/services/FileService';
import { ProcessService } from '../../../../importar-datos/infrastructure/services/ProcessService';

@Component({
  selector: 'app-template-flow',
  templateUrl: './template.flow.html',
  imports: [RouterOutlet, RouterLink, FaIconComponent, NgClass],
})
export class TemplateFlow implements OnInit {
  faArrowUpFromBracket = faArrowUpFromBracket;
  faDiagramProject = faDiagramProject;
  faPaperPlane = faPaperPlane;
  faFileLines = faFileLines;

  private router = inject(Router);
  readonly templateFlowService = inject(TemplateFlowService);
  private fileService = inject(FileService);
  private processService = inject(ProcessService);

  readonly config = this.templateFlowService.selectedConfig;
  readonly processType = this.templateFlowService.processType;
  readonly importFiles = this.fileService.importFiles;
  readonly process = this.processService.process;

  readonly steps = [
    {
      label: 'Subir archivos',
      icon: faArrowUpFromBracket,
      path: '/cargas/importar/manual/template',
    },
    {
      label: 'Tipo de proceso',
      icon: faDiagramProject,
      path: '/cargas/importar/manual/template/tipo-proceso',
    },
    {
      label: 'Confirmar importación',
      icon: faPaperPlane,
      path: '/cargas/importar/manual/template/confirmar',
    },
  ];

  async ngOnInit() {
    // Reset file list for new flow
    this.fileService.importFiles.set([]);
    // Create process using template config data
    const cfg = this.config();
    try {
      const response = await this.processService.saveProcess({
        company: cfg?.empresa ?? null,
        layout: cfg?.interfaz ?? null,
        process_type: cfg?.tipoCarga ?? null,
        template_name: cfg?.templateName ?? null,
        responsible: cfg?.responsable ?? null,
      });
      localStorage.setItem('process_id', response.id ?? '');
      this.processService.process.set(response);
    } catch {
      // Mock fallback: create a temporary process id so file uploads work
      const mockId = 'template-' + Date.now();
      localStorage.setItem('process_id', mockId);
    }
  }

  getCurrentStepIndex(): number {
    const url = this.router.url;
    if (url.includes('confirmar')) return 2;
    if (url.includes('tipo-proceso')) return 1;
    return 0;
  }

  getStepNumber(): number {
    return this.getCurrentStepIndex() + 1;
  }

  getPercent(): number {
    return Math.round(this.getStepNumber() * 33.33);
  }

  stepClass(stepIndex: number): string {
    const current = this.getCurrentStepIndex();
    if (current === stepIndex) return 'bg-rin-ink text-white shadow-lg';
    if (current > stepIndex) return 'bg-rin-orange text-white';
    return 'bg-white text-rin-ink/40 border border-rin-line';
  }

  readonly fileCount = computed(() => this.importFiles().length);

  readonly fileExtensions = computed(() => {
    const exts = this.importFiles()
      .map((f: { fileName: string }) => f.fileName.split('.').pop()?.toUpperCase() ?? '')
      .filter((e: string) => e !== '');
    return [...new Set(exts)].join(', ') || '-';
  });

  readonly hasHeaders = computed(() => {
    const f = this.importFiles()[0];
    if (!f) return null;
    return f.firstRowHeaders;
  });
}
