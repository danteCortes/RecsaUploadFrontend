import { inject, Injectable, signal } from '@angular/core';
import { ProcessAdapter } from '../adapters/ProcessAdapter';
import { SaveProcessUseCase } from '../../application/use-cases/SaveProcessUseCase';
import { UpdateProcessUseCase } from '../../application/use-cases/UpdateProcessUseCase';
import { FindProcessByIdUseCase } from '../../application/use-cases/FindProcessByIdUseCase';
import { GetFilesByProcessUseCase } from '../../application/use-cases/GetFilesByProcessUseCase';
import type { ProcessResponse } from '../../application/responses/process/ProcessResponse';
import type { SaveProcessRequest } from '../requests/SaveProcessRequest';
import { ProcessDTO } from '../../application/dtos/process/ProcessDTO';
import type { UpdateProcessRequest } from '../requests/UpdateProcessRequest';
import type { FileResponse } from '../../application/responses/file/FileResponse';

@Injectable({ providedIn: 'root' })
export class ProcessService {
  private repository: ProcessAdapter = inject(ProcessAdapter);

  private saveProcessUseCase: SaveProcessUseCase = SaveProcessUseCase.create(this.repository);
  private updateProcessUseCase: UpdateProcessUseCase = UpdateProcessUseCase.create(this.repository);
  private findProcessByIdUseCase: FindProcessByIdUseCase = FindProcessByIdUseCase.create(
    this.repository,
  );
  private getFilesByProcessUseCase: GetFilesByProcessUseCase = GetFilesByProcessUseCase.create(
    this.repository,
  );

  readonly process = signal<{
    id: string | null;
    company: string | null;
    loadType: string | null;
    processType: string | null;
    layout: string | null;
    responsible: string | null;
  } | null>(null);

  async saveProcess(request: SaveProcessRequest): Promise<ProcessResponse> {
    const response = await this.saveProcessUseCase.exec(
      new ProcessDTO(
        request.company,
        request.load_type,
        request.process_type,
        request.layout,
        request.responsible,
      ),
    );

    return response;
  }

  async showProcess(id: string): Promise<ProcessResponse> {
    const response = await this.findProcessByIdUseCase.exec(id);

    return response;
  }

  async updateProcess(request: UpdateProcessRequest, id: string): Promise<ProcessResponse> {
    const response = await this.updateProcessUseCase.exec(
      new ProcessDTO(
        request.company,
        request.load_type,
        request.process_type,
        request.layout,
        request.responsible,
      ),
      id,
    );

    return response;
  }

  async filesProcess(id: string): Promise<FileResponse[]> {
    const response = await this.getFilesByProcessUseCase.exec(id);

    return response;
  }
}
