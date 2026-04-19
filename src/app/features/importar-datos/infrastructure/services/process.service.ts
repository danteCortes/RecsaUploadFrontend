import { inject, Injectable, signal } from '@angular/core';
import { SaveProcessUseCase } from '../../application/use-cases/save-process.use-case';
import { ProcessDTO } from '../dtos/process.dto';
import { ProcessAdapter } from '../adapters/process.adapter';
import type { SaveProcessRequest } from '../requests/save.process.request';
import { SaveProcessDTO } from '../../application/dtos/process/save-process.dto';
import { GetFilesByProcessUseCase } from '../../application/use-cases/get-files-by-process.use-case';
import { FileDTO } from '../dtos/file.dto';

@Injectable({ providedIn: 'root' })
export class ProcessService {
  private repository = inject(ProcessAdapter);
  private saveUseCase: SaveProcessUseCase = new SaveProcessUseCase(this.repository);
  private getFilesUseCase: GetFilesByProcessUseCase = new GetFilesByProcessUseCase(this.repository);

  readonly files = signal<
    {
      size: number;
      file: File;
    }[]
  >([]);

  readonly processId = signal<string | null>(null);

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

  async getFiles(id: string): Promise<FileDTO[]> {
    const response = await this.getFilesUseCase.exec(id);

    return response.map(
      (file) =>
        new FileDTO(
          file.id,
          file.process,
          file.name,
          file.format,
          file.size,
          file.path,
          file.delimiter,
          file.codification,
          file.separator,
          file.spreadsheet,
          file.status,
          file.key,
        ),
    );
  }
}
