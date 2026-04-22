import { ImportFile } from '../entities/ImportFile';
import { decimalSeparatorFromString } from '../enums/DecimalSeparator';
import { fileDelimiterFromString } from '../enums/FileDelimiter';
import { fileEncodingFromString } from '../enums/FileEncoding';
import { fileFormatFromString } from '../enums/FileFormat';
import { FirstRowHeadersValues } from '../enums/FirstRowHeaders';
import { DuplicatedRows } from '../value-objects/file/DuplicatedRows';
import { ErrorRows } from '../value-objects/file/ErrorRows';
import { FileName } from '../value-objects/file/FileName';
import { FileSize } from '../value-objects/file/FileSize';
import { ImportFileId } from '../value-objects/file/ImportFileId';
import { Key } from '../value-objects/file/Key';
import { Position } from '../value-objects/file/Position';
import { ProcessConfigId } from '../value-objects/file/ProcessConfigId';
import { SpreadSheet } from '../value-objects/file/Spreadsheet';
import { StoragePath } from '../value-objects/file/StoragePath';
import { ValidRows } from '../value-objects/file/ValidRows';

export class ImportFileFactory {
  static fromPrimitives(
    id: string | null,
    fileName: string,
    fileFormat: string,
    fileSize: number,
    storagePath: string,
    decimalSeparator: string | null,
    fileEncoding: string | null,
    fileDelimiter: string | null,
    spreadsheet: string | null,
    processConfigId: string,
    firstRowHeaders: boolean,
    key: string | null,
    position: number | null,
    validRows: number,
    duplicatedRows: number,
    errorRows: number,
  ): ImportFile {
    return ImportFile.create(
      id ? ImportFileId.create(id) : null,
      FileName.create(fileName),
      fileFormatFromString(fileFormat),
      FileSize.create(fileSize),
      StoragePath.create(storagePath),
      decimalSeparator ? decimalSeparatorFromString(decimalSeparator) : null,
      fileEncoding ? fileEncodingFromString(fileEncoding) : null,
      fileDelimiter ? fileDelimiterFromString(fileDelimiter) : null,
      spreadsheet ? SpreadSheet.create(spreadsheet) : null,
      ProcessConfigId.create(processConfigId),
      firstRowHeaders ? FirstRowHeadersValues.YES : FirstRowHeadersValues.NO,
      key ? Key.create(key) : null,
      position ? Position.create(position) : null,
      ValidRows.create(validRows),
      DuplicatedRows.create(duplicatedRows),
      ErrorRows.create(errorRows),
    );
  }
}
