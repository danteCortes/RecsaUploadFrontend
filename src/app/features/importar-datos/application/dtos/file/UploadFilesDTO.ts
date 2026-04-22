export class UploadFilesDTO {
  constructor(
    public readonly files: {
      name: string;
      mimeType: string;
      content: ArrayBuffer;
    }[],
    public readonly processConfigId: string,
  ) {}
}
