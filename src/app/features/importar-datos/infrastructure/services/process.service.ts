import { inject, Injectable } from '@angular/core';
import { SaveProcessUseCase } from '../../application/use-cases/save-process.use-case';
import { ProcessDTO } from '../dtos/process.dto';
import { ProcessAdapter } from '../adapters/process.adapter';
import type { SaveProcessRequest } from '../requests/save.process.request';
import { SaveProcessDTO } from '../../application/dtos/process/save-process.dto';

@Injectable({ providedIn: 'root' })
export class ProcessService {
  private repository = inject(ProcessAdapter);
  private saveUseCase: SaveProcessUseCase = new SaveProcessUseCase(this.repository);

  async save(request: SaveProcessRequest): Promise<ProcessDTO> {
    const dto = new SaveProcessDTO(
      request.company,
      request.load_type,
      request.process_type,
      request.layout,
      request.responsible,
    );
    const response = await this.saveUseCase.exec(dto);

    return new ProcessDTO(
      response.id,
      response.company,
      response.load_type,
      response.process_type,
      response.layout_name,
      response.responsible,
    );
  }
}
