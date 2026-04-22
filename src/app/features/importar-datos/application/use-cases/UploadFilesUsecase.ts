import type { FileRepository } from '../../domain/ports/FilePort';
import { FileUploadCommand } from '../../domain/value-objects/file/FileUploadCommand';
import { ProcessConfigId } from '../../domain/value-objects/file/ProcessConfigId';
import type { UploadFilesDTO } from '../dtos/file/UploadFilesDTO';
import { FileResponse } from '../responses/file/FileResponse';

export class UploadFilesUseCase {
  private constructor(private readonly repository: FileRepository) {}

  static create(repository: FileRepository): UploadFilesUseCase {
    return new UploadFilesUseCase(repository);
  }

  async exec(dto: UploadFilesDTO): Promise<FileResponse[]> {
    const entities = await this.repository.uploadFiles(
      dto.files.map((file) => FileUploadCommand.create(file.name, file.mimeType, file.content)),
      ProcessConfigId.create(dto.processConfigId),
    );

    return entities.map(
      (entity) =>
        new FileResponse(
          entity.id()?.value() ?? null,
          entity.fileName().value(),
          entity.fileFormat(),
          entity.fileSize().value(),
          entity.storagePath().value(),
          entity.decimalSeparator(),
          entity.fileEncoding(),
          entity.fileDelimiter(),
          entity.spreadsheet()?.value() ?? null,
          entity.processConfigId().value(),
          entity.isFirstRowHeaders(),
          entity.key()?.value() ?? null,
          entity.position()?.value() ?? null,
          entity.validRows().value(),
          entity.duplicatedRows().value(),
          entity.errorRows().value(),
        ),
    );
  }
}
