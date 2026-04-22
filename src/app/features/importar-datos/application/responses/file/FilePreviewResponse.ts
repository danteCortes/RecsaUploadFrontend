export class FilePreviewResponse {
  constructor(
    public readonly headers: string[],
    public readonly data: string[][],
  ) {}
}
