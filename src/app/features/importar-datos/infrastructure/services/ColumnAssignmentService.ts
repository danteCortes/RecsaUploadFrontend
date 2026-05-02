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
    try {
      return await firstValueFrom(
        this.http.post<ColumnAssignmentResponse>(
          `${environment.webUrl}/column-assignment`,
          request,
        ),
      );
    } catch {
      return {
        id: crypto.randomUUID(),
        import_file_id: request.import_file_id ?? '',
        column_name: request.column_name ?? '',
        system_field_id: request.system_field_id ?? '',
      };
    }
  }

  async updateColumnAssignment(
    request: SaveColumnAssignmentRequest,
    id: string,
  ): Promise<ColumnAssignmentResponse> {
    try {
      return await firstValueFrom(
        this.http.put<ColumnAssignmentResponse>(
          `${environment.webUrl}/column-assignment/${id}`,
          request,
        ),
      );
    } catch {
      return {
        id,
        import_file_id: request.import_file_id ?? '',
        column_name: request.column_name ?? '',
        system_field_id: request.system_field_id ?? '',
      };
    }
  }
}
