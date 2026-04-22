import { ProcessFactory } from '../../domain/factories/ProcessFactory';
import type { ProcessRepository } from '../../domain/ports/ProcessPort';
import type { ProcessDTO } from '../dtos/process/ProcessDTO';
import { ProcessResponse } from '../responses/process/ProcessResponse';

export class SaveProcessUseCase {
  private constructor(private readonly repository: ProcessRepository) {}

  static create(repository: ProcessRepository): SaveProcessUseCase {
    return new SaveProcessUseCase(repository);
  }

  async exec(dto: ProcessDTO): Promise<ProcessResponse> {
    const entity = await this.repository.save(
      ProcessFactory.fromPrimitives(
        null,
        dto.company,
        dto.loadType,
        dto.processType,
        dto.layout,
        dto.responsible,
      ),
    );

    return new ProcessResponse(
      entity.id()?.value() ?? null,
      entity.companyId()?.value() ?? null,
      entity.loadTypeId()?.value() ?? null,
      entity.processTypeId()?.value() ?? null,
      entity.layoutId()?.value() ?? null,
      entity.responsible()?.value() ?? null,
    );
  }
}
