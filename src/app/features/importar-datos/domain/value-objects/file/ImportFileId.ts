export class ImportFileId {
  private constructor(private _value: string) {}

  public static create(value: string): ImportFileId {
    if (value.trim() === '') throw new Error('El id del archivo no debe estar vacío');

    return new ImportFileId(value);
  }

  value(): string {
    return this._value;
  }
}
