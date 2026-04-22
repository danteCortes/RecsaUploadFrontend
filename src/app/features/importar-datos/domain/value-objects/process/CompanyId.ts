export class CompanyId {
  private constructor(private _value: string) {}

  public static create(value: string): CompanyId {
    if (value.trim() === '') throw new Error('La empresa no debe estar vacío');

    return new CompanyId(value);
  }

  value(): string {
    return this._value;
  }
}
