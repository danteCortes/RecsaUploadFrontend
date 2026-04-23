import type { ColumnAssignment } from '../entities/ColumnAssignment';

export interface ColumnAssignmentPort {
  save(entity: ColumnAssignment): Promise<ColumnAssignment>;

  update(entity: ColumnAssignment): Promise<ColumnAssignment>;
}
