export class ColumnName {
  private constructor(private readonly _value: string) {}

  static create(value: string): ColumnName {
    if (value.trim() === '') throw new Error('El nombre de la columna no debe estar vacío.');

    return new ColumnName(value);
  }

  value(): string {
    return this._value;
  }
}
