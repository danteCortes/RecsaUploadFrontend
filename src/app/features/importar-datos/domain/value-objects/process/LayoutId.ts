export class LayoutId {
  private constructor(private _value: string) {}

  public static create(value: string): LayoutId {
    if (value.trim() === '') throw new Error('La interfaz no debe estar vacío');

    return new LayoutId(value);
  }

  value(): string {
    return this._value;
  }
}
