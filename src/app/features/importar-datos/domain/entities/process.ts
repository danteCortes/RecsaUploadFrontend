import type { CompanyId } from '../value-objects/process/CompanyId';
import type { LayoutId } from '../value-objects/process/LayoutId';
import type { LoadTypeId } from '../value-objects/process/LoadTypeId';
import type { ProcessId } from '../value-objects/process/ProcessId';
import type { ProcessTypeId } from '../value-objects/process/ProcessTypeId';
import type { Responsible } from '../value-objects/process/Responsible';

export class Process {
  private constructor(
    private readonly _id: ProcessId | null,
    private readonly _companyId: CompanyId | null,
    private readonly _loadTypeId: LoadTypeId | null,
    private readonly _processTypeId: ProcessTypeId | null,
    private readonly _layoutId: LayoutId | null,
    private readonly _responsible: Responsible | null,
  ) {}

  static create(
    id: ProcessId | null,
    companyId: CompanyId | null,
    loadTypeId: LoadTypeId | null,
    processTypeId: ProcessTypeId | null,
    layoutId: LayoutId | null,
    responsible: Responsible | null,
  ): Process {
    return new Process(id, companyId, loadTypeId, processTypeId, layoutId, responsible);
  }

  id(): ProcessId | null {
    return this._id;
  }

  companyId(): CompanyId | null {
    return this._companyId;
  }

  loadTypeId(): LoadTypeId | null {
    return this._loadTypeId;
  }

  processTypeId(): ProcessTypeId | null {
    return this._processTypeId;
  }

  layoutId(): LayoutId | null {
    return this._layoutId;
  }

  responsible(): Responsible | null {
    return this._responsible;
  }
}
