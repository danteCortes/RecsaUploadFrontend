export class ErrorRows {
  private constructor(private readonly _value: number) {}

  static create(value: number): ErrorRows {
    if (value < 0) throw new Error('Las filas con error no debe ser menor que cero.');

    return new ErrorRows(value);
  }

  value(): number {
    return this._value;
  }
}
