export class LoadTypeId {
  private constructor(private _value: string) {}

  public static create(value: string): LoadTypeId {
    if (value.trim() === '') throw new Error('El tipo de carga no debe estar vacío');

    return new LoadTypeId(value);
  }

  value(): string {
    return this._value;
  }
}
