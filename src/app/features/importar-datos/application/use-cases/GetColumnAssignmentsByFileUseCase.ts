import type { FileRepository } from '../../domain/ports/FilePort';
import { ImportFileId } from '../../domain/value-objects/file/ImportFileId';
import { ColumnAssignmentResponse } from '../responses/columnAssignment/ColumnAssignmentResponse';

export class GetColumnAssignmentsByFileUseCase {
  private constructor(private readonly repository: FileRepository) {}

  static create(repository: FileRepository): GetColumnAssignmentsByFileUseCase {
    return new GetColumnAssignmentsByFileUseCase(repository);
  }

  async exec(id: string): Promise<ColumnAssignmentResponse[]> {
    const entities = await this.repository.getColumnAssignmentsbyFile(ImportFileId.create(id));

    return entities.map((entity) =>
      ColumnAssignmentResponse.create(
        entity.id()?.value() ?? '',
        entity.importFileId().value(),
        entity.columnName().value(),
        entity.systemFieldId().value(),
      ),
    );
  }
}
