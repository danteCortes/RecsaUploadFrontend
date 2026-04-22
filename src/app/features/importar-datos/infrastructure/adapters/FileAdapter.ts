import { inject } from '@angular/core';
import type { ImportFile } from '../../domain/entities/ImportFile';
import type { FileRepository } from '../../domain/ports/FilePort';
import { FilePreview } from '../../domain/value-objects/file/FilePreview';
import type { FileUploadCommand } from '../../domain/value-objects/file/FileUploadCommand';
import type { ImportFileId } from '../../domain/value-objects/file/ImportFileId';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import type { ProcessConfigId } from '../../domain/value-objects/file/ProcessConfigId';
import type { FileResponse } from '../../application/responses/file/FileResponse';
import { ImportFileFactory } from '../../domain/factories/ImportFileFactory';
import { UpdateFileRequest } from '../requests/UpdateFileRequest';

export class FileAdapter implements FileRepository {
  private http = inject(HttpClient);

  async uploadFiles(
    files: FileUploadCommand[],
    process_config: ProcessConfigId,
  ): Promise<ImportFile[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(
        'files[]',
        new Blob([file.content()], { type: file.mimeType() }),
        file.name(),
      );
    });
    formData.append('process_config', process_config.value());

    const data = await firstValueFrom(
      this.http.post<{
        message: string;
        data: FileResponse[];
      }>(`${environment.apiUrl}/import-file`, formData),
    );

    return data.data.map((data) =>
      ImportFileFactory.fromPrimitives(
        data.id,
        data.fileName,
        data.fileFormat,
        data.fileSize,
        data.storagePath,
        data.decimalSeparator,
        data.fileEncoding,
        data.fileDelimiter,
        data.spreadsheet,
        data.processConfigId,
        data.firstRowHeaders,
        data.key,
        data.position,
        data.validRows,
        data.duplicatedRows,
        data.errorRows,
      ),
    );
  }

  async updateFile(file: ImportFile): Promise<ImportFile> {
    const id = file.id();
    if (!id) throw new Error('La entidad del archivo no tiene un Id.');

    const data = await firstValueFrom(
      this.http.put<{
        message: string;
        data: FileResponse;
      }>(
        `${environment}/import-file/${id}`,
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
      data.data.processConfigId,
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
    await firstValueFrom(this.http.delete<void>(`${environment}/import-file/${id.value()}`));
  }
}
