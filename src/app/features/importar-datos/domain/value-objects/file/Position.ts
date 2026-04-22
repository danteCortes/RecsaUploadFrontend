export class Position {
  private constructor(private readonly _value: number) {}

  static create(value: number): Position {
    if (value <= 0) throw new Error('La posición del archivo debe ser mayor que cero.');

    return new Position(value);
  }

  value(): number {
    return this._value;
  }
}
