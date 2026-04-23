import { ColumnAssignment } from '../entities/ColumnAssignment';
import { ColumnAssignmentId } from '../value-objects/columnAssignment/ColumnAssignmentId';
import { ColumnName } from '../value-objects/columnAssignment/ColumnName';
import { ImportFileId } from '../value-objects/file/ImportFileId';
import { SystemFieldId } from '../value-objects/systemField/SystemFieldId';

export class ColumnAssignmentFactory {
  static fromPrimitives(
    id: string | null,
    importFileId: string,
    columnName: string,
    systemFieldId: string,
  ): ColumnAssignment {
    return ColumnAssignment.create(
      id ? ColumnAssignmentId.create(id) : null,
      ImportFileId.create(importFileId),
      ColumnName.create(columnName),
      SystemFieldId.create(systemFieldId),
    );
  }
}
