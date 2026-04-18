import { File } from "../entities/file";
import { Process } from "../entities/process";
import { ProcessId } from "../value-objects/process/processId";

export interface ProcessRepository
{
    saveProces(entity: Process): Promise<Process>;
    updateProces(entity: Process): Promise<Process>;
    findProces(): Promise<Process | null>;
    showProces(id: ProcessId): Promise<Process>;
    getFilesByProces(id: ProcessId): Promise<File[]>;
}