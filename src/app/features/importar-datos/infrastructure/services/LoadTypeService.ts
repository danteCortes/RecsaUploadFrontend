import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoadTypeService {
  private http: HttpClient = inject(HttpClient);

  readonly loadTypes = signal<{ id: string; name: string }[]>([]);

  async getLoadTypes(): Promise<{ id: string; name: string }[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<{ loadTypes: { id: string; name: string }[] }>(
          `${environment.apiUrl}/load-type`,
        ),
      );
      return data.loadTypes;
    } catch {
      return [
        { id: 'Clientes', name: 'Clientes' },
        { id: 'Deuda', name: 'Deuda' },
        { id: 'Teléfono', name: 'Teléfono' },
        { id: 'Pagos', name: 'Pagos' },
        { id: 'Cuota', name: 'Cuota' },
        { id: 'Saldos', name: 'Saldos' },
        { id: 'Ofertas', name: 'Ofertas' },
      ];
    }
  }
}
