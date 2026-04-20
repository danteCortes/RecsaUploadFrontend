import { inject, Injectable } from '@angular/core';
import { FileAdapter } from '../adapters/file.adapter';
import { UploadFilesUseCase } from '../../application/use-cases/upload-files.use-case';
import { FileDTO } from '../dtos/file.dto';
import { DeleteFileUseCase } from '../../application/use-cases/delete-file.use-case';

@Injectable({ providedIn: 'root' })
export class FileService {
  private repository: FileAdapter = inject(FileAdapter);
  private uploadFilesUseCase: UploadFilesUseCase = new UploadFilesUseCase(this.repository);
  private deleteFileUseCase: DeleteFileUseCase = new DeleteFileUseCase(this.repository);

  async save(files: File[], process: string): Promise<FileDTO[]> {
    const response = await this.uploadFilesUseCase.exec({ files: files }, process);

    return response.map(
      (file) =>
        new FileDTO(
          file.id()?.value() ?? '',
          file.process().value(),
          file.name().value(),
          file.format().value(),
          file.size().value(),
          file.path().value(),
          file.delimiter()?.value() ?? null,
          file.codification()?.value() ?? null,
          file.separator()?.value() ?? null,
          file.spreadsheet()?.value() ?? null,
          file.isConfigurated(),
          file.key()?.value() ?? null,
        ),
    );
  }

  async delete(id: string): Promise<void> {
    await this.deleteFileUseCase.exec(id);
  }
}
