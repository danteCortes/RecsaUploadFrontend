import type { HttpClient } from '@angular/common/http';
import type { File } from '../../domain/entities/file';
import type { Process } from '../../domain/entities/process';
import type { ProcessRepository } from '../../domain/ports/proces.port';
import type { ProcessId } from '../../domain/value-objects/process/processId';
import { firstValueFrom } from 'rxjs';
import type { ProcessDTO } from '../dtos/process.dto';
import { ProcessMapper } from '../mappers/process.mapper';

export class ProcessAdapter implements ProcessRepository {
  constructor(private http: HttpClient) {}

  async saveProcess(entity: Process): Promise<Process> {
    const request = ProcessMapper.entityToSaveRequest(entity);

    const data = await firstValueFrom(this.http.post<ProcessDTO>(`/process-config`, request));

    return ProcessMapper.dtoToEntity(data);
  }

  updateProcess(entity: Process): Promise<Process> {
    throw new Error('Method not implemented.' + entity.id()?.value());
  }
  findProcess(): Promise<Process | null> {
    throw new Error('Method not implemented.');
  }
  showProcess(id: ProcessId): Promise<Process> {
    throw new Error('Method not implemented.' + id.value());
  }
  getFilesByProcess(id: ProcessId): Promise<File[]> {
    throw new Error('Method not implemented.' + id.value());
  }
}
