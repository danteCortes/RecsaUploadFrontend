export class StoragePath {
  private constructor(private _value: string) {}

  public static create(value: string): StoragePath {
    if (value.trim() === '') throw new Error('La ruta del archivo no debe estar vacío');

    return new StoragePath(value);
  }

  value(): string {
    return this._value;
  }
}
