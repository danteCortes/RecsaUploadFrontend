import type { FileRepository } from '../../domain/ports/FilePort';
import { ImportFileId } from '../../domain/value-objects/file/ImportFileId';
import { FilePreviewResponse } from '../responses/file/FilePreviewResponse';

export class PreviewFileUseCase {
  private constructor(private readonly repository: FileRepository) {}

  static create(repository: FileRepository): PreviewFileUseCase {
    return new PreviewFileUseCase(repository);
  }

  async exec(id: string): Promise<FilePreviewResponse> {
    const entity = await this.repository.previewFile(ImportFileId.create(id));

    return new FilePreviewResponse(entity.headers(), entity.data());
  }
}
