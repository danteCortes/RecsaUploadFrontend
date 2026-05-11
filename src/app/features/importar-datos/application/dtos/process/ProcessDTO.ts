export class ProcessDTO {
  constructor(
    public readonly company: string | null,
    public readonly processType: string | null,
    public readonly templateName: string | null,
    public readonly layout: string | null,
    public readonly responsible: string | null,
  ) {}
}
