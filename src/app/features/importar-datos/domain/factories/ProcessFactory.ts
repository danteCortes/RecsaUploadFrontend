import { Process } from '../entities/process';
import { CompanyId } from '../value-objects/process/CompanyId';
import { LayoutId } from '../value-objects/process/LayoutId';
import { LoadTypeId } from '../value-objects/process/LoadTypeId';
import { ProcessId } from '../value-objects/process/processId';
import { ProcessTypeId } from '../value-objects/process/ProcessTypeId';
import { Responsible } from '../value-objects/process/responsible';

export class ProcessFactory {
  static fromPrimitives(
    id: string | null,
    companyId: string | null,
    loadTypeId: string | null,
    processTypeId: string | null,
    layoutId: string | null,
    responsible: string | null,
  ): Process {
    return Process.create(
      id ? ProcessId.create(id) : null,
      companyId ? CompanyId.create(companyId) : null,
      loadTypeId ? LoadTypeId.create(loadTypeId) : null,
      processTypeId ? ProcessTypeId.create(processTypeId) : null,
      layoutId ? LayoutId.create(layoutId) : null,
      responsible ? Responsible.create(responsible) : null,
    );
  }
}
