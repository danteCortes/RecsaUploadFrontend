import { ImportFileFactory } from '../../domain/factories/ImportFileFactory';
import type { FileRepository } from '../../domain/ports/FilePort';
import type { UpdateFileDTO } from '../dtos/file/updateFileDTO';
import { FileResponse } from '../responses/file/FileResponse';

export class UpdateFileUseCase {
  private constructor(private readonly repository: FileRepository) {}

  static create(repository: FileRepository): UpdateFileUseCase {
    return new UpdateFileUseCase(repository);
  }

  async exec(dto: UpdateFileDTO, id: string): Promise<FileResponse> {
    const entity = await this.repository.updateFile(
      ImportFileFactory.fromPrimitives(
        id,
        dto.fileName,
        dto.fileFormat,
        dto.fileSize,
        dto.storagePath,
        dto.decimalSeparator,
        dto.fileEncoding,
        dto.fileDelimiter,
        dto.spreadsheet,
        dto.processConfigId,
        dto.firstRowHeaders,
        dto.key,
        dto.position,
        dto.validRows,
        dto.duplicatedRows,
        dto.errorRows,
      ),
    );

    return new FileResponse(
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
    );
  }
}
