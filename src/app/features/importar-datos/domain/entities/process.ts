import { Company } from "../value-objects/process/company";
import { LayoutName } from "../value-objects/process/layoutName";
import { LoadType } from "../value-objects/process/loadType";
import { ProcessId } from "../value-objects/process/processId";
import { ProcessType } from "../value-objects/process/processType";
import { Responsible } from "../value-objects/process/responsible";

export class Process
{
    private constructor(
        private readonly _id: ProcessId | null,
        private readonly _company: Company | null,
        private readonly _loadType: LoadType | null,
        private readonly _processType: ProcessType | null,
        private readonly _layoutName: LayoutName | null,
        private readonly _responsible: Responsible | null,
    ){}

    static create(
        id: ProcessId | null,
        company: Company | null,
        loadType: LoadType | null,
        processType: ProcessType | null,
        layoutName: LayoutName | null,
        responsible: Responsible | null,
    ): Process
    {
        if(!id && !company && !loadType && !processType && !layoutName && !responsible)
            throw new Error("El proceso no debe estar vacío.");

        return new Process(
            id,
            company,
            loadType,
            processType,
            layoutName,
            responsible,
        );
    }

    id(): ProcessId | null {
        return this._id;
    }

    company(): Company | null {
        return this._company;
    }

    loadType(): LoadType | null {
        return this._loadType;
    }

    processType(): ProcessType | null {
        return this._processType;
    }

    layoutName(): LayoutName | null {
        return this._layoutName;
    }

    responsible(): Responsible | null {
        return this._responsible;
    }
}