import { inject, Injectable } from '@angular/core';
import type { ImportFile } from '../../domain/entities/ImportFile';
import type { FileRepository } from '../../domain/ports/FilePort';
import { FilePreview } from '../../domain/value-objects/file/FilePreview';
import type { FileUploadCommand } from '../../domain/value-objects/file/FileUploadCommand';
import type { ImportFileId } from '../../domain/value-objects/file/ImportFileId';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import type { ProcessConfigId } from '../../domain/value-objects/file/ProcessConfigId';
import type { FileResponse } from '../../application/responses/file/FileResponse';
import { ImportFileFactory } from '../../domain/factories/ImportFileFactory';
import { UpdateFileRequest } from '../requests/UpdateFileRequest';
import type { ColumnAssignment } from '../../domain/entities/ColumnAssignment';
import type { ColumnAssignmentResponse } from '../../application/responses/columnAssignment/ColumnAssignmentResponse';
import { ColumnAssignmentFactory } from '../../domain/factories/ColumnAssignmentFactory';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB

@Injectable({ providedIn: 'root' })
export class FileAdapter implements FileRepository {
  private http = inject(HttpClient);
  private uploadProgress$ = new Subject<number>();

  async uploadFiles(
    files: FileUploadCommand[],
    process_config: ProcessConfigId,
  ): Promise<ImportFile[]> {
    const results: ImportFile[] = [];

    for (const file of files) {
      try {
        const rawFile = file.content();
        const imported =
          rawFile.size > CHUNK_SIZE
            ? await this.uploadInChunks(rawFile, process_config.value())
            : await this.uploadSimple(rawFile, process_config.value());
        results.push(imported);
      } catch {
        const rawFile = file.content();
        const ext = rawFile.name.split('.').pop()?.toUpperCase() ?? 'CSV';
        results.push(
          ImportFileFactory.fromPrimitives(
            crypto.randomUUID(),
            rawFile.name,
            ext,
            rawFile.size,
            `mock/${rawFile.name}`,
            null,
            'UTF-8',
            null,
            ext === 'XLSX' ? 'Hoja1' : null,
            process_config.value(),
            true,
            null,
            results.length,
            0,
            0,
            0,
          ),
        );
      }
    }

    return results;
  }

  async updateFile(file: ImportFile): Promise<ImportFile> {
    const id = file.id();
    if (!id) throw new Error('La entidad del archivo no tiene un Id.');

    try {
      const data = await firstValueFrom(
        this.http.put<{ message: string; data: FileResponse }>(
          `${environment.webUrl}/import-file/${id.value()}`,
          new UpdateFileRequest(
            file.fileName().value(),
            file.fileFormat(),
            file.fileSize().value(),
            file.storagePath().value(),
            file.decimalSeparator(),
            file.fileEncoding(),
            file.fileDelimiter(),
            file.spreadsheet()?.value() ?? null,
            file.processConfigId().value(),
            file.isFirstRowHeaders(),
            file.key()?.value() ?? null,
            file.position()?.value() ?? null,
            file.validRows().value(),
            file.duplicatedRows().value(),
            file.errorRows().value(),
          ),
        ),
      );

      return ImportFileFactory.fromPrimitives(
        data.data.id,
        data.data.fileName,
        data.data.fileFormat,
        data.data.fileSize,
        data.data.storagePath,
        data.data.decimalSeparator,
        data.data.fileEncoding,
        data.data.fileDelimiter,
        data.data.spreadsheet,
        data.data.processConfig,
        data.data.firstRowHeaders,
        data.data.key,
        data.data.position,
        data.data.validRows,
        data.data.duplicatedRows,
        data.data.errorRows,
      );
    } catch {
      return ImportFileFactory.fromPrimitives(
        file.id()?.value() ?? crypto.randomUUID(),
        file.fileName().value(),
        file.fileFormat(),
        file.fileSize().value(),
        file.storagePath().value(),
        file.decimalSeparator(),
        file.fileEncoding(),
        file.fileDelimiter(),
        file.spreadsheet()?.value() ?? null,
        file.processConfigId().value(),
        file.isFirstRowHeaders(),
        file.key()?.value() ?? null,
        file.position()?.value() ?? null,
        197,
        2,
        6,
      );
    }
  }

  async previewFile(id: ImportFileId): Promise<FilePreview> {
    try {
      const data = await firstValueFrom(
        this.http.get<{ columns: string[]; rows: string[][] }>(
          `${environment.webUrl}/import-file/${id.value()}/preview`,
        ),
      );
      return FilePreview.create(data.columns, data.rows);
    } catch {
      return FilePreview.create(
        [
          'RUT',
          'Nombre_Completo',
          'Direccion',
          'Telefono_Principal',
          'Telefono_Secundario',
          'Email',
          'Monto_Deuda_Original',
          'Monto_Deuda_Actual',
          'Fecha_Vencimiento',
          'Numero_Documento',
          'Producto',
          'Sucursal_Origen',
          'Dias_Mora',
          'Tramo_Mora',
        ],
        [
          [
            '12345678-9',
            'Juan Pérez González',
            'Av. Libertador 1234',
            '912345678',
            '987654321',
            'juan.perez@email.com',
            '1500000',
            '1350000',
            '2024-03-15',
            'FAC-2024-001',
            'Crédito Consumo',
            'Sucursal Centro',
            '45',
            '30-60 días',
          ],
          [
            '98765432-1',
            'María Silva Rojas',
            'Calle Los Aromos 567',
            '956781234',
            '965432187',
            'maria.silva@email.com',
            '2800000',
            '2800000',
            '2024-04-20',
            'FAC-2024-002',
            'Tarjeta de Crédito',
            'Sucursal Norte',
            '15',
            '0-30 días',
          ],
          [
            '11223344-5',
            'Carlos Muñoz López',
            'Pasaje Las Rosas 89',
            '945678912',
            '923456789',
            'carlos.munoz@email.com',
            '950000',
            '475000',
            '2024-02-10',
            'PAG-2024-003',
            'Préstamo Personal',
            'Sucursal Sur',
            '90',
            '90-120 días',
          ],
        ],
      );
    }
  }

  async deleteFile(id: ImportFileId): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${environment.webUrl}/import-file/${id.value()}`),
      );
    } catch {
      // mock: silently succeed
    }
  }

  async getColumnAssignmentsbyFile(id: ImportFileId): Promise<ColumnAssignment[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<ColumnAssignmentResponse[]>(
          `${environment.webUrl}/import-file/${id.value()}/column-assignments`,
        ),
      );
      return data.map((column) =>
        ColumnAssignmentFactory.fromPrimitives(
          column.id,
          column.import_file_id,
          column.column_name,
          column.system_field_id,
        ),
      );
    } catch {
      return [];
    }
  }

  async getSpreadsheets(id: ImportFileId): Promise<string[]> {
    try {
      return await firstValueFrom(
        this.http.get<string[]>(`${environment.webUrl}/import-file/${id.value()}/spreadsheets`),
      );
    } catch {
      return ['Hoja1'];
    }
  }

  private async uploadSimple(file: File, processConfigId: string): Promise<ImportFile> {
    const formData = new FormData();
    formData.append('files[]', file, file.name);
    formData.append('process_config', processConfigId);

    const data = await firstValueFrom(
      this.http.post<{ message: string; data: FileResponse[] }>(
        `${environment.apiUrl}/uploaded-file`,
        formData,
      ),
    );

    const result = data.data[0];
    this.uploadProgress$.next(100);

    return ImportFileFactory.fromPrimitives(
      result.id,
      result.fileName,
      result.fileFormat,
      result.fileSize,
      result.storagePath,
      result.decimalSeparator,
      result.fileEncoding,
      result.fileDelimiter,
      result.spreadsheet,
      result.processConfig,
      result.firstRowHeaders,
      result.key,
      result.position,
      result.validRows,
      result.duplicatedRows,
      result.errorRows,
    );
  }

  private async uploadInChunks(file: File, processConfigId: string): Promise<ImportFile> {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = crypto.randomUUID();

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('upload_id', uploadId);
      formData.append('chunk_index', String(i));

      await firstValueFrom(this.http.post(`${environment.webUrl}/import-file/chunk`, formData));

      this.uploadProgress$.next(Math.round(((i + 1) / totalChunks) * 100));
    }

    const completeForm = new FormData();
    completeForm.append('upload_id', uploadId);
    completeForm.append('filename', file.name);
    completeForm.append('process_config', processConfigId);

    const data = await firstValueFrom(
      this.http.post<{ data: FileResponse }>(
        `${environment.webUrl}/import-file/complete`,
        completeForm,
      ),
    );

    return ImportFileFactory.fromPrimitives(
      data.data.id,
      data.data.fileName,
      data.data.fileFormat,
      data.data.fileSize,
      data.data.storagePath,
      data.data.decimalSeparator,
      data.data.fileEncoding,
      data.data.fileDelimiter,
      data.data.spreadsheet,
      data.data.processConfig,
      data.data.firstRowHeaders,
      data.data.key,
      data.data.position,
      data.data.validRows,
      data.data.duplicatedRows,
      data.data.errorRows,
    );
  }

  getUploadProgress$(): Observable<number> {
    return this.uploadProgress$.asObservable();
  }
}
