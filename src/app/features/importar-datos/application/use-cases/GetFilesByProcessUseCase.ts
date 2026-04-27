import type { ProcessRepository } from '../../domain/ports/ProcessPort';
import { ProcessId } from '../../domain/value-objects/process/processId';
import { FileResponse } from '../responses/file/FileResponse';

export class GetFilesByProcessUseCase {
  private constructor(private readonly repository: ProcessRepository) {}

  static create(repository: ProcessRepository): GetFilesByProcessUseCase {
    return new GetFilesByProcessUseCase(repository);
  }

  async exec(id: string): Promise<FileResponse[]> {
    const entities = await this.repository.files(ProcessId.create(id));

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
