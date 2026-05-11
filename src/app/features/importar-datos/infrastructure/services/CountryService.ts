import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);

  readonly countries = signal<{ id: string; name: string; alpha2: string }[]>([]);

  async getCountries(): Promise<{ id: string; name: string; alpha2: string }[]> {
    const data = await firstValueFrom(
      this.http.get<{ countries: { id: string; name: string; alpha2: string; alpha3: string }[] }>(
        `${environment.apiUrl}/country`,
      ),
    );
    return data.countries.map((c) => ({ id: c.id, name: c.name, alpha2: c.alpha2 }));
  }
}
