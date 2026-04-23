import type { ColumnAssignmentId } from '../value-objects/columnAssignment/ColumnAssignmentId';
import type { ColumnName } from '../value-objects/columnAssignment/ColumnName';
import type { ImportFileId } from '../value-objects/file/ImportFileId';
import type { SystemFieldId } from '../value-objects/systemField/SystemFieldId';

export class ColumnAssignment {
  private constructor(
    private readonly _id: ColumnAssignmentId | null,
    private readonly _importFileId: ImportFileId,
    private readonly _columnName: ColumnName,
    private readonly _systemFieldId: SystemFieldId,
  ) {}

  static create(
    id: ColumnAssignmentId | null,
    importFileId: ImportFileId,
    columnName: ColumnName,
    systemFieldId: SystemFieldId,
  ): ColumnAssignment {
    return new ColumnAssignment(id, importFileId, columnName, systemFieldId);
  }

  id(): ColumnAssignmentId | null {
    return this._id;
  }

  importFileId(): ImportFileId {
    return this._importFileId;
  }

  columnName(): ColumnName {
    return this._columnName;
  }

  systemFieldId(): SystemFieldId {
    return this._systemFieldId;
  }
}
