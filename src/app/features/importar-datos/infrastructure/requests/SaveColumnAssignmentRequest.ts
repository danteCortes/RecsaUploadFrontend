export class SaveColumnAssignmentRequest {
  constructor(
    public readonly import_file_id: string,
    public readonly column_name: string,
    public readonly system_field_id: string,
  ) {}
}
