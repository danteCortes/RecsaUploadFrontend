export class ColumnAssignmentId {
  private constructor(private readonly _value: string) {}

  static create(value: string): ColumnAssignmentId {
    if (value.trim() === '') throw new Error('El id de la columna asignada no debe estar vacío.');

    return new ColumnAssignmentId(value);
  }

  value(): string {
    return this._value;
  }
}
