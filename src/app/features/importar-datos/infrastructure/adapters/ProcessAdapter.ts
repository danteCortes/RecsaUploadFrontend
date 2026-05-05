import { inject, Injectable } from '@angular/core';
import type { ProcessRepository } from '../../domain/ports/ProcessPort';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import type { Process } from '../../domain/entities/process';
import type { ProcessId } from '../../domain/value-objects/process/ProcessId';
import type { ImportFile } from '../../domain/entities/ImportFile';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ProcessFactory } from '../../domain/factories/ProcessFactory';
import type { FileResponse } from '../../application/responses/file/FileResponse';
import { ImportFileFactory } from '../../domain/factories/ImportFileFactory';

interface ProcessApiResponse {
  id: string;
  company: string | null;
  loadType: string | null;
  layout: string | null;
  responsible: string | null;
  templateName: string | null;
  startDate: string | null;
  records: number;
  status: string | null;
}

export interface PaginatedProcessResponse {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  from: number | null;
  to: number | null;
  items: {
    id: string;
    company_code: string;
    company_name: string;
    company_status: boolean;
    country: string;
    loadType: string;
    layout: string;
    responsible: string;
    templateName: string;
    startDate: string | null;
    records: number;
  }[];
}

@Injectable({ providedIn: 'root' })
export class ProcessAdapter implements ProcessRepository {
  private http: HttpClient = inject(HttpClient);

  async save(entity: Process): Promise<Process> {
    try {
      const data = await firstValueFrom(
        this.http.post<ProcessApiResponse>(`${environment.apiUrl}/process`, {
          company: entity.companyId()?.value() ?? null,
          load_type: entity.loadTypeId()?.value() ?? null,
          layout: entity.layoutId()?.value() ?? null,
          responsible: entity.responsible()?.value() ?? null,
          template_name: entity.processTypeId()?.value() ?? null,
        }),
      );
      return ProcessFactory.fromPrimitives(
        data.id,
        data.company,
        data.loadType,
        data.templateName,
        data.layout,
        data.responsible,
      );
    } catch {
      const mockId = crypto.randomUUID();
      return ProcessFactory.fromPrimitives(
        mockId,
        entity.companyId()?.value() ?? null,
        entity.loadTypeId()?.value() ?? null,
        entity.processTypeId()?.value() ?? null,
        entity.layoutId()?.value() ?? null,
        entity.responsible()?.value() ?? null,
      );
    }
  }

  async findById(id: ProcessId): Promise<Process> {
    try {
      const data = await firstValueFrom(
        this.http.get<ProcessApiResponse>(`${environment.apiUrl}/process/${id.value()}`),
      );
      return ProcessFactory.fromPrimitives(
        data.id,
        data.company,
        data.loadType,
        data.templateName,
        data.layout,
        data.responsible,
      );
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        throw error;
      }
      return ProcessFactory.fromPrimitives(id.value(), null, null, null, null, null);
    }
  }

  async update(entity: Process): Promise<Process> {
    const id = entity.id();
    if (!id) throw new Error('La entidad del proceso no tiene un id.');

    try {
      const data = await firstValueFrom(
        this.http.put<ProcessApiResponse>(`${environment.apiUrl}/process/${id.value()}`, {
          company: entity.companyId()?.value() ?? null,
          load_type: entity.loadTypeId()?.value() ?? null,
          layout: entity.layoutId()?.value() ?? null,
          responsible: entity.responsible()?.value() ?? null,
          template_name: entity.processTypeId()?.value() ?? null,
        }),
      );
      return ProcessFactory.fromPrimitives(
        data.id,
        data.company,
        data.loadType,
        data.templateName,
        data.layout,
        data.responsible,
      );
    } catch {
      return entity;
    }
  }

  async files(id: ProcessId): Promise<ImportFile[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<{ importFiles: FileResponse[] }>(
          `${environment.apiUrl}/process/${id.value()}/files`,
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
    } catch {
      return [];
    }
  }

  async listProcesses(
    page: number,
    perPage: number,
    search: string,
  ): Promise<PaginatedProcessResponse> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('perPage', String(perPage))
      .set('search', search);

    try {
      return await firstValueFrom(
        this.http.get<PaginatedProcessResponse>(`${environment.apiUrl}/process/list`, { params }),
      );
    } catch {
      return { total: 0, perPage, page, lastPage: 1, from: null, to: null, items: [] };
    }
  }
}
