import type { ColumnAssignment } from '../entities/ColumnAssignment';
import type { ImportFile } from '../entities/ImportFile';
import type { FilePreview } from '../value-objects/file/filePreview';
import type { FileUploadCommand } from '../value-objects/file/FileUploadCommand';
import type { ImportFileId } from '../value-objects/file/ImportFileId';
import type { ProcessConfigId } from '../value-objects/file/ProcessConfigId';

export interface FileRepository {
  uploadFiles(files: FileUploadCommand[], process_config: ProcessConfigId): Promise<ImportFile[]>;
  updateFile(file: ImportFile): Promise<ImportFile>;
  previewFile(id: ImportFileId): Promise<FilePreview>;
  deleteFile(id: ImportFileId): Promise<void>;
  getColumnAssignmentsbyFile(id: ImportFileId): Promise<ColumnAssignment[]>;
}
