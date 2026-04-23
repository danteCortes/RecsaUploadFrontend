import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SystemFieldService {
  private http: HttpClient = inject(HttpClient);

  readonly systemFields = signal<
    { id: string; name: string; column: string; required: boolean; position: number }[]
  >([]);

  async listSystemFields(): Promise<
    {
      id: string;
      name: string;
      column: string;
      required: boolean;
      position: number;
    }[]
  > {
    const data = await firstValueFrom(
      this.http.get<{
        systemFields: {
          id: string;
          name: string;
          column: string;
          required: boolean;
          position: number;
        }[];
      }>(`${environment.apiUrl}/system-field`),
    );

    return data.systemFields;
  }
}
