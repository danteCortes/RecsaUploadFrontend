import { ProcessFactory } from '../../domain/factories/ProcessFactory';
import type { ProcessRepository } from '../../domain/ports/ProcessPort';
import type { ProcessDTO } from '../dtos/process/ProcessDTO';
import { ProcessResponse } from '../responses/process/ProcessResponse';

export class UpdateProcessUseCase {
  private constructor(private readonly repository: ProcessRepository) {}

  static create(repository: ProcessRepository): UpdateProcessUseCase {
    return new UpdateProcessUseCase(repository);
  }

  async exec(dto: ProcessDTO, id: string): Promise<ProcessResponse> {
    const entity = await this.repository.update(
      ProcessFactory.fromPrimitives(
        id,
        dto.company,
        dto.loadType,
        dto.processType,
        dto.layout,
        dto.responsible,
      ),
    );

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
