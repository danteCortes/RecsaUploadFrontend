import type { ProcessRepository } from '../../domain/ports/ProcessPort';
import { ProcessId } from '../../domain/value-objects/process/ProcessId';
import { ProcessResponse } from '../responses/process/ProcessResponse';

export class FindProcessByIdUseCase {
  private constructor(private readonly repository: ProcessRepository) {}

  static create(repository: ProcessRepository): FindProcessByIdUseCase {
    return new FindProcessByIdUseCase(repository);
  }

  async exec(id: string): Promise<ProcessResponse> {
    const entity = await this.repository.findById(ProcessId.create(id));

    return new ProcessResponse(
      id,
      entity.companyId()?.value() ?? null,
      entity.loadTypeId()?.value() ?? null,
      entity.processTypeId()?.value() ?? null,
      entity.layoutId()?.value() ?? null,
      entity.responsible()?.value() ?? null,
    );
  }
}
