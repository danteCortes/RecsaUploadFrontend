export class SystemFieldId {
  private constructor(private readonly _value: string) {}

  static create(value: string): SystemFieldId {
    if (value.trim() === '') throw new Error('El id del campo del sistema no debe estar vacío.');

    return new SystemFieldId(value);
  }

  value(): string {
    return this._value;
  }
}
