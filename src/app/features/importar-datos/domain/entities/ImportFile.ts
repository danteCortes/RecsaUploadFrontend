import type { DecimalSeparator } from '../enums/DecimalSeparator';
import type { FileDelimiter } from '../enums/FileDelimiter';
import type { FileEncoding } from '../enums/FileEncoding';
import type { FileFormat } from '../enums/FileFormat';
import type { FirstRowHeaders } from '../enums/FirstRowHeaders';
import { FirstRowHeadersValues } from '../enums/FirstRowHeaders';
import type { DuplicatedRows } from '../value-objects/file/DuplicatedRows';
import type { ErrorRows } from '../value-objects/file/ErrorRows';
import type { FileName } from '../value-objects/file/FileName';
import type { FileSize } from '../value-objects/file/FileSize';
import type { ImportFileId } from '../value-objects/file/ImportFileId';
import type { Key } from '../value-objects/file/Key';
import type { Position } from '../value-objects/file/Position';
import type { ProcessConfigId } from '../value-objects/file/ProcessConfigId';
import type { SpreadSheet } from '../value-objects/file/Spreadsheet';
import type { StoragePath } from '../value-objects/file/StoragePath';
import type { ValidRows } from '../value-objects/file/ValidRows';

export class ImportFile {
  private constructor(
    private readonly _id: ImportFileId | null,
    private readonly _fileName: FileName,
    private readonly _fileFormat: FileFormat,
    private readonly _fileSize: FileSize,
    private readonly _storagePath: StoragePath,
    private readonly _decimalSeparator: DecimalSeparator | null,
    private readonly _fileEncoding: FileEncoding | null,
    private readonly _fileDelimiter: FileDelimiter | null,
    private readonly _spreadsheet: SpreadSheet | null,
    private readonly _processConfigId: ProcessConfigId,
    private readonly _firstRowHeaders: FirstRowHeaders,
    private readonly _key: Key | null,
    private readonly _position: Position | null,
    private readonly _validRows: ValidRows,
    private readonly _duplicatedRows: DuplicatedRows,
    private readonly _errorRows: ErrorRows,
  ) {}

  static create(
    id: ImportFileId | null,
    fileName: FileName,
    fileFormat: FileFormat,
    fileSize: FileSize,
    storagePath: StoragePath,
    decimalSeparator: DecimalSeparator | null,
    fileEncoding: FileEncoding | null,
    fileDelimiter: FileDelimiter | null,
    spreadsheet: SpreadSheet | null,
    processConfigId: ProcessConfigId,
    firstRowHeaders: FirstRowHeaders,
    key: Key | null,
    position: Position | null,
    validRows: ValidRows,
    duplicatedRows: DuplicatedRows,
    errorRows: ErrorRows,
  ): ImportFile {
    return new ImportFile(
      id,
      fileName,
      fileFormat,
      fileSize,
      storagePath,
      decimalSeparator,
      fileEncoding,
      fileDelimiter,
      spreadsheet,
      processConfigId,
      firstRowHeaders,
      key,
      position,
      validRows,
      duplicatedRows,
      errorRows,
    );
  }

  public id(): ImportFileId | null {
    return this._id;
  }

  public fileName(): FileName {
    return this._fileName;
  }

  public fileFormat(): FileFormat {
    return this._fileFormat;
  }

  public fileSize(): FileSize {
    return this._fileSize;
  }

  public storagePath(): StoragePath {
    return this._storagePath;
  }

  public decimalSeparator(): DecimalSeparator | null {
    return this._decimalSeparator;
  }

  public fileEncoding(): FileEncoding | null {
    return this._fileEncoding;
  }

  public fileDelimiter(): FileDelimiter | null {
    return this._fileDelimiter;
  }

  public spreadsheet(): SpreadSheet | null {
    return this._spreadsheet;
  }

  public processConfigId(): ProcessConfigId {
    return this._processConfigId;
  }

  public isFirstRowHeaders(): boolean {
    return this._firstRowHeaders === FirstRowHeadersValues.YES;
  }

  public key(): Key | null {
    return this._key;
  }

  public position(): Position | null {
    return this._position;
  }

  public validRows(): ValidRows {
    return this._validRows;
  }

  public duplicatedRows(): DuplicatedRows {
    return this._duplicatedRows;
  }

  public errorRows(): ErrorRows {
    return this._errorRows;
  }
}
