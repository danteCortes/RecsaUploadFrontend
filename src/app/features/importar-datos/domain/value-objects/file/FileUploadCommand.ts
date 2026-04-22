export class FileUploadCommand {
  private constructor(
    private readonly _name: string,
    private readonly _mimeType: string,
    private readonly _content: ArrayBuffer,
  ) {}

  static create(name: string, mimeType: string, content: ArrayBuffer): FileUploadCommand {
    this.validate(name, mimeType, content);

    return new FileUploadCommand(name, mimeType, content);
  }

  private static validate(name: string, mimeType: string, content: ArrayBuffer): void {
    if (name.trim() === '') throw new Error('el nombre del archivo no puede estar vacío.');

    if (mimeType.trim() === '') throw new Error('el tipo del archivo no puede estar vacío.');

    if (content.byteLength === 0) throw new Error('El contenido del archivo no puede estar vacío.');
  }

  name(): string {
    return this._name;
  }

  mimeType(): string {
    return this._mimeType;
  }

  content(): ArrayBuffer {
    return this._content;
  }
}
