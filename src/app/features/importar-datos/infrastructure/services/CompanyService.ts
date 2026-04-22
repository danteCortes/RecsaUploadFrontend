import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private http: HttpClient = inject(HttpClient);

  readonly companies = signal<{ id: string; name: string }[]>([]);

  async getCompanies(): Promise<{ id: string; name: string }[]> {
    const data = await firstValueFrom(
      this.http.get<{ companies: { id: string; name: string }[] }>(`${environment.apiUrl}/company`),
    );

    return data.companies;
  }
}
