export class ColumnAssignmentResponse {
  private constructor(
    public readonly id: string,
    public readonly import_file_id: string,
    public readonly column_name: string,
    public readonly system_field_id: string,
  ) {}

  static create(
    id: string,
    import_file_id: string,
    column_name: string,
    system_field_id: string,
  ): ColumnAssignmentResponse {
    return new ColumnAssignmentResponse(id, import_file_id, column_name, system_field_id);
  }
}
