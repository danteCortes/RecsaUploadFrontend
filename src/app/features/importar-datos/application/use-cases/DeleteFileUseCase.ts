import type { FileRepository } from '../../domain/ports/FilePort';
import { ImportFileId } from '../../domain/value-objects/file/ImportFileId';

export class DeleteFileUseCase {
  private constructor(private readonly repository: FileRepository) {}

  static create(repository: FileRepository): DeleteFileUseCase {
    return new DeleteFileUseCase(repository);
  }

  async exec(id: string): Promise<void> {
    await this.repository.deleteFile(ImportFileId.create(id));
  }
}
