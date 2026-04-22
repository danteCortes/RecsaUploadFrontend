export class ProcessTypeId {
  private constructor(private _value: string) {}

  public static create(value: string): ProcessTypeId {
    if (value.trim() === '') throw new Error('El tipo de proceso no debe estar vacío');

    return new ProcessTypeId(value);
  }

  value(): string {
    return this._value;
  }
}
