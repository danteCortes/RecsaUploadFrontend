export class SpreadSheet {
  private constructor(private _value: string) {}

  public static create(value: string): SpreadSheet {
    if (value.trim() === '') throw new Error('la hoja del archivo no debe estar vacío.');

    return new SpreadSheet(value);
  }

  value(): string {
    return this._value;
  }
}
