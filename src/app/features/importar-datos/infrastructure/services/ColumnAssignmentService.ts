import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { ColumnAssignmentResponse } from '../../application/responses/columnAssignment/ColumnAssignmentResponse';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import type { SaveColumnAssignmentRequest } from '../requests/SaveColumnAssignmentRequest';

@Injectable({ providedIn: 'root' })
export class ColumnAssignmentService {
  private http: HttpClient = inject(HttpClient);

  async saveColumnAssignment(
    request: SaveColumnAssignmentRequest,
  ): Promise<ColumnAssignmentResponse> {
    const data = await firstValueFrom(
      this.http.post<ColumnAssignmentResponse>(`${environment.apiUrl}/column-assignment`, request),
    );

    return data;
  }

  async updateColumnAssignment(
    request: SaveColumnAssignmentRequest,
    id: string,
  ): Promise<ColumnAssignmentResponse> {
    const data = await firstValueFrom(
      this.http.put<ColumnAssignmentResponse>(
        `${environment.apiUrl}/column-assignment/${id}`,
        request,
      ),
    );

    return data;
  }
}
