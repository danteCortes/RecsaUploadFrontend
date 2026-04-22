import { inject, Injectable } from '@angular/core';
import type { ProcessRepository } from '../../domain/ports/ProcessPort';
import { HttpClient } from '@angular/common/http';
import type { Process } from '../../domain/entities/process';
import type { ProcessId } from '../../domain/value-objects/process/ProcessId';
import type { ImportFile } from '../../domain/entities/ImportFile';
import { firstValueFrom } from 'rxjs';
import type { ProcessResponse } from '../../application/responses/process/ProcessResponse';
import { environment } from '../../../../../environments/environment';
import { SaveProcessRequest } from '../requests/SaveProcessRequest';
import { ProcessFactory } from '../../domain/factories/ProcessFactory';
import type { FileResponse } from '../../application/responses/file/FileResponse';
import { ImportFileFactory } from '../../domain/factories/ImportFileFactory';

@Injectable({ providedIn: 'root' })
export class ProcessAdapter implements ProcessRepository {
  private http: HttpClient = inject(HttpClient);

  async save(entity: Process): Promise<Process> {
    const data = await firstValueFrom(
      this.http.post<ProcessResponse>(
        `${environment.apiUrl}/process-config`,
        new SaveProcessRequest(
          entity.companyId()?.value() ?? null,
          entity.loadTypeId()?.value() ?? null,
          entity.processTypeId()?.value() ?? null,
          entity.layoutId()?.value() ?? null,
          entity.responsible()?.value() ?? null,
        ),
      ),
    );

    return ProcessFactory.fromPrimitives(
      data.id,
      data.company,
      data.loadType,
      data.processType,
      data.layout,
      data.responsible,
    );
  }

  async findById(id: ProcessId): Promise<Process> {
    const data = await firstValueFrom(
      this.http.get<ProcessResponse>(`${environment.apiUrl}/process-config/${id.value()}`),
    );

    return ProcessFactory.fromPrimitives(
      data.id,
      data.company,
      data.loadType,
      data.processType,
      data.layout,
      data.responsible,
    );
  }

  async update(entity: Process): Promise<Process> {
    const id = entity.id();
    if (!id) throw new Error('La entidad del proceso no tiene un id.');

    const data = await firstValueFrom(
      this.http.put<ProcessResponse>(
        `${environment.apiUrl}/process-config/${id.value()}`,
        new SaveProcessRequest(
          entity.companyId()?.value() ?? null,
          entity.loadTypeId()?.value() ?? null,
          entity.processTypeId()?.value() ?? null,
          entity.layoutId()?.value() ?? null,
          entity.responsible()?.value() ?? null,
        ),
      ),
    );

    return ProcessFactory.fromPrimitives(
      data.id,
      data.company,
      data.loadType,
      data.processType,
      data.layout,
      data.responsible,
    );
  }

  async files(id: ProcessId): Promise<ImportFile[]> {
    const data = await firstValueFrom(
      this.http.get<{ importFiles: FileResponse[] }>(
        `${environment.apiUrl}/process-config/${id.value()}/files`,
      ),
    );

    return data.importFiles.map((file) =>
      ImportFileFactory.fromPrimitives(
        file.id,
        file.fileName,
        file.fileFormat,
        file.fileSize,
        file.storagePath,
        file.decimalSeparator,
        file.fileEncoding,
        file.fileDelimiter,
        file.spreadsheet,
        file.processConfig,
        file.firstRowHeaders,
        file.key,
        file.position,
        file.validRows,
        file.duplicatedRows,
        file.errorRows,
      ),
    );
  }
}
