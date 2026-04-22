export class ProcessConfigId {
  private constructor(private _value: string) {}

  public static create(value: string): ProcessConfigId {
    if (value.trim() === '') throw new Error('El id del proceso no debe estar vacío');

    return new ProcessConfigId(value);
  }

  value(): string {
    return this._value;
  }
}
