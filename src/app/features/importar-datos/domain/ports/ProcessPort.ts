import type { ImportFile } from '../entities/ImportFile';
import type { Process } from '../entities/process';
import type { ProcessId } from '../value-objects/process/ProcessId';

export interface ProcessRepository {
  save(entity: Process): Promise<Process>;

  findById(id: ProcessId): Promise<Process>;

  update(entity: Process): Promise<Process>;

  files(id: ProcessId): Promise<ImportFile[]>;
}
