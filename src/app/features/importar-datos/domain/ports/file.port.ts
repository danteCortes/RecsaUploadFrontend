import { File } from "../entities/file";
import { FileId } from "../value-objects/file/fileId";
import { FilePreview } from "../value-objects/file/filePreview";

export interface FileRepository
{
    saveFile(file: File): Promise<File>;
    updateFile(file: File): Promise<File>;
    previewFile(id: FileId): Promise<FilePreview>;
}