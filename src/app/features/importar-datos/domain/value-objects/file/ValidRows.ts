export class ValidRows {
  private constructor(private readonly _value: number) {}

  static create(value: number): ValidRows {
    if (value < 0) throw new Error('Las filas válidas no debe ser menor que cero.');

    return new ValidRows(value);
  }

  value(): number {
    return this._value;
  }
}
