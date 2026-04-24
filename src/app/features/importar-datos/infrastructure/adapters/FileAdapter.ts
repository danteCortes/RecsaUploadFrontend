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
      const imported = await this.uploadSingleFileInChunks(file.content(), process_config.value());
      results.push(imported);
    }

    return results;
  }

  async updateFile(file: ImportFile): Promise<ImportFile> {
    const id = file.id();
    if (!id) throw new Error('La entidad del archivo no tiene un Id.');

    const data = await firstValueFrom(
      this.http.put<{
        message: string;
        data: FileResponse;
      }>(
        `${environment.apiUrl}/import-file/${id.value()}`,
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
  }

  async previewFile(id: ImportFileId): Promise<FilePreview> {
    const data = await firstValueFrom(
      this.http.get<{
        columns: string[];
        rows: string[][];
      }>(`${environment.apiUrl}/import-file/${id.value()}/preview`),
    );

    return FilePreview.create(data.columns, data.rows);
  }

  async deleteFile(id: ImportFileId): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${environment.apiUrl}/import-file/${id.value()}`));
  }

  async getColumnAssignmentsbyFile(id: ImportFileId): Promise<ColumnAssignment[]> {
    const data = await firstValueFrom(
      this.http.get<ColumnAssignmentResponse[]>(
        `${environment.apiUrl}/import-file/${id.value()}/column-assignments`,
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
  }

  private async uploadSingleFileInChunks(file: File, processConfigId: string): Promise<ImportFile> {
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = crypto.randomUUID();

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('upload_id', uploadId);
      formData.append('chunk_index', String(i));
      formData.append('total_chunks', String(totalChunks));
      formData.append('filename', file.name);
      formData.append('mime_type', file.type);
      formData.append('process_config', processConfigId);

      await firstValueFrom(this.http.post(`${environment.apiUrl}/import-file/chunk`, formData));

      // Emite progreso si tienes un Subject/Signal para la barra
      this.uploadProgress$.next(Math.round(((i + 1) / totalChunks) * 100));
    }

    // Notifica que terminó y recibe la entidad creada
    const data = await firstValueFrom(
      this.http.post<{ data: FileResponse }>(`${environment.apiUrl}/import-file/complete`, {
        upload_id: uploadId,
        filename: file.name,
        process_config: processConfigId,
      }),
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
