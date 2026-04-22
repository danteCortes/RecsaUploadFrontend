import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private http: HttpClient = inject(HttpClient);

  readonly layouts = signal<{ id: string; name: string }[]>([]);

  async getLayouts(): Promise<{ id: string; name: string }[]> {
    const data = await firstValueFrom(
      this.http.get<{ layouts: { id: string; name: string }[] }>(`${environment.apiUrl}/layout`),
    );

    return data.layouts;
  }
}
