import type { ProcessRepository } from '../../domain/ports/proces.port';
import { ProcessId } from '../../domain/value-objects/process/processId';
import { FileResponse } from '../responses/file/FileResponse';

export class GetFilesByProcessUseCase {
  constructor(private readonly repository: ProcessRepository) {}

  async exec(id: string): Promise<FileResponse[]> {
    const entities = await this.repository.getFilesByProcess(ProcessId.create(id));

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
