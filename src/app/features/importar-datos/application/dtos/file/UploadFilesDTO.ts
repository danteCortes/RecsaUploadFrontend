export class UploadFilesDTO {
  constructor(
    public readonly files: {
      name: string;
      mimeType: string;
      content: File;
    }[],
    public readonly processConfigId: string,
  ) {}
}
