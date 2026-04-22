import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProcessTypeService {
  private http: HttpClient = inject(HttpClient);

  readonly processTypes = signal<{ id: string; name: string }[]>([]);

  async getProcessTypes(): Promise<{ id: string; name: string }[]> {
    // const data = await firstValueFrom(
    //   this.http.get<{ id: string; name: string }[]>(`${environment.apiUrl}/process-type`),
    // );

    return [
      { id: 'Flujo', name: 'Flujo' },
      { id: 'Refresco', name: 'Refresco' },
    ];
  }
}
