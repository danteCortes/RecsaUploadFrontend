import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import type { File } from '../../domain/entities/file';
import type { Process } from '../../domain/entities/process';
import type { ProcessRepository } from '../../domain/ports/proces.port';
import type { ProcessId } from '../../domain/value-objects/process/processId';
import { firstValueFrom } from 'rxjs';
import type { ProcessDTO } from '../dtos/process.dto';
import { ProcessMapper } from '../mappers/process.mapper';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import type { FileDTO } from '../dtos/file.dto';
import { FileFactory } from '../../domain/factories/file.factory';

@Injectable({ providedIn: 'root' })
export class ProcessAdapter implements ProcessRepository {
  private http: HttpClient = inject(HttpClient);

  async saveProcess(entity: Process): Promise<Process> {
    try {
      const request = ProcessMapper.entityToSaveRequest(entity);

      const data = await firstValueFrom(
        this.http.post<ProcessDTO>(`${environment.apiUrl}/process-config`, request),
      );

      return ProcessMapper.dtoToEntity(data);
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        throw new Error(
          error.error?.message || 'Error al comunicarse con el servidor',
          { cause: error }, // 👈 CLAVE
        );
      }

      if (error instanceof Error) {
        throw new Error(error.message, { cause: error }); // 👈 CLAVE
      }

      throw new Error('Error inesperado en infraestructura', { cause: error });
    }
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

  async getFilesByProcess(id: ProcessId): Promise<File[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<{ importFiles: FileDTO[] }>(
          `${environment.apiUrl}/process-config/${id.value()}/files`,
        ),
      );

      return data.importFiles.map((file) =>
        FileFactory.fromPrimitives(
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
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        throw new Error(
          error.error?.message || 'Error al comunicarse con el servidor',
          { cause: error }, // 👈 CLAVE
        );
      }

      if (error instanceof Error) {
        throw new Error(error.message, { cause: error }); // 👈 CLAVE
      }

      throw new Error('Error inesperado en infraestructura', { cause: error });
    }
  }
}
