import { inject, Injectable, signal } from '@angular/core';
import { FileAdapter } from '../adapters/FileAdapter';
import { UploadFilesUseCase } from '../../application/use-cases/UploadFilesUsecase';
import { UpdateFileUseCase } from '../../application/use-cases/UpdateFileUsecase';
import { PreviewFileUseCase } from '../../application/use-cases/PreviewFileUseCase';
import { DeleteFileUseCase } from '../../application/use-cases/DeleteFileUseCase';
import { UploadFilesDTO } from '../../application/dtos/file/UploadFilesDTO';
import type { UpdateFileRequest } from '../requests/UpdateFileRequest';
import { UpdateFileDTO } from '../../application/dtos/file/updateFileDTO';
import type { FileResponse } from '../../application/responses/file/FileResponse';
import type { FilePreviewResponse } from '../../application/responses/file/FilePreviewResponse';
import type { ColumnAssignmentResponse } from '../../application/responses/columnAssignment/ColumnAssignmentResponse';
import { GetColumnAssignmentsByFileUseCase } from '../../application/use-cases/GetColumnAssignmentsByFileUseCase';

@Injectable({ providedIn: 'root' })
export class FileService {
  private repository: FileAdapter = inject(FileAdapter);

  private uploadFilesUseCase: UploadFilesUseCase = UploadFilesUseCase.create(this.repository);
  private updateFileUseCase: UpdateFileUseCase = UpdateFileUseCase.create(this.repository);
  private previewFileUseCase: PreviewFileUseCase = PreviewFileUseCase.create(this.repository);
  private deleteFileUseCase: DeleteFileUseCase = DeleteFileUseCase.create(this.repository);
  private getColumnAssignmentsByFileUseCase: GetColumnAssignmentsByFileUseCase =
    GetColumnAssignmentsByFileUseCase.create(this.repository);

  readonly files = signal<File[]>([]);
  readonly columnAssignments = signal<ColumnAssignmentResponse[]>([]);
  readonly importFiles = signal<
    {
      id: string | null;
      fileName: string;
      fileFormat: string;
      fileSize: number;
      storagePath: string;
      decimalSeparator: string | null;
      fileEncoding: string | null;
      fileDelimiter: string | null;
      spreadsheet: string | null;
      processConfig: string;
      firstRowHeaders: boolean;
      key: string | null;
      position: number | null;
      validRows: number;
      duplicatedRows: number;
      errorRows: number;
    }[]
  >([]);

  async uploadFiles(files: File[], processConfigId: string): Promise<FileResponse[]> {
    const response = await this.uploadFilesUseCase.exec(
      new UploadFilesDTO(
        await Promise.all(
          files.map(async (file) => ({
            name: file.name,
            mimeType: file.type,
            content: file,
          })),
        ),
        processConfigId,
      ),
    );

    return response;
  }

  async updateFile(request: UpdateFileRequest, id: string): Promise<FileResponse> {
    const response = await this.updateFileUseCase.exec(
      new UpdateFileDTO(
        request.fileName,
        request.fileFormat,
        request.fileSize,
        request.storagePath,
        request.decimalSeparator,
        request.fileEncoding,
        request.fileDelimiter,
        request.spreadsheet,
        request.processConfig,
        request.firstRowHeaders,
        request.key,
        request.position,
        request.validRows,
        request.duplicatedRows,
        request.errorRows,
      ),
      id,
    );

    return response;
  }

  async previewFile(id: string): Promise<FilePreviewResponse> {
    const response = await this.previewFileUseCase.exec(id);

    return response;
  }

  async deleteFile(id: string): Promise<void> {
    await this.deleteFileUseCase.exec(id);
  }

  async getColumnAssignmentsByFile(id: string): Promise<ColumnAssignmentResponse[]> {
    const response = await this.getColumnAssignmentsByFileUseCase.exec(id);

    return response;
  }

  updateImportFile(updatedFile: FileResponse) {
    this.importFiles.update((files) =>
      files.map((f) => (f.id === updatedFile.id ? updatedFile : f)),
    );
  }

  async swapFiles(indexA: number, indexB: number) {
    const files = this.importFiles();
    const fileA = files[indexA];
    const fileB = files[indexB];

    // Actualizar en BD (los dos intercambian posición)
    await Promise.all([
      this.updateFile({ ...fileA, position: indexB + 1 }, fileA.id!),
      this.updateFile({ ...fileB, position: indexA + 1 }, fileB.id!),
    ]);

    // Actualizar el signal local
    this.importFiles.update((current) => {
      const updated = [...current];
      [updated[indexA], updated[indexB]] = [updated[indexB], updated[indexA]];
      return updated;
    });
  }
}
