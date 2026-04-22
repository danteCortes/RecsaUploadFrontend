export class ProcessResponse {
  constructor(
    public readonly id: string | null,
    public readonly company: string | null,
    public readonly loadType: string | null,
    public readonly processType: string | null,
    public readonly layout: string | null,
    public readonly responsible: string | null,
  ) {}
}
