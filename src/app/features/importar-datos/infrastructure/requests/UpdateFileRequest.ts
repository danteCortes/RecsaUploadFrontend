export class UpdateFileRequest {
  constructor(
    public readonly fileName: string,
    public readonly fileFormat: string,
    public readonly fileSize: number,
    public readonly storagePath: string,
    public readonly decimalSeparator: string | null,
    public readonly fileEncoding: string | null,
    public readonly fileDelimiter: string | null,
    public readonly spreadsheet: string | null,
    public readonly processConfigId: string,
    public readonly firstRowHeaders: boolean,
    public readonly key: string | null,
    public readonly position: number | null,
    public readonly validRows: number,
    public readonly duplicatedRows: number,
    public readonly errorRows: number,
  ) {}
}
