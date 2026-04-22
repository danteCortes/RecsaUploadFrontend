export class DuplicatedRows {
  private constructor(private readonly _value: number) {}

  static create(value: number): DuplicatedRows {
    if (value < 0) throw new Error('Las filas duplicadas no debe ser menor que cero.');

    return new DuplicatedRows(value);
  }

  value(): number {
    return this._value;
  }
}
