import type { File } from '../entities/file';
import type { FileId } from '../value-objects/file/fileId';
import type { FilePreview } from '../value-objects/file/filePreview';

export interface FileRepository {
  saveFile(file: File): Promise<File>;
  updateFile(file: File): Promise<File>;
  previewFile(id: FileId): Promise<FilePreview>;
}
