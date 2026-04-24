export class FileUploadCommand {
  private constructor(
    private readonly _name: string,
    private readonly _mimeType: string,
    private readonly _content: File,
  ) {}

  static create(name: string, mimeType: string, content: File): FileUploadCommand {
    this.validate(name, mimeType, content);

    return new FileUploadCommand(name, mimeType, content);
  }

  private static validate(name: string, mimeType: string, content: File): void {
    if (name.trim() === '') throw new Error('el nombre del archivo no puede estar vacío.');

    if (mimeType.trim() === '') throw new Error('el tipo del archivo no puede estar vacío.');

    if (content.size === 0) throw new Error('El contenido del archivo no puede estar vacío.');
  }

  name(): string {
    return this._name;
  }

  mimeType(): string {
    return this._mimeType;
  }

  content(): File {
    return this._content;
  }
}
