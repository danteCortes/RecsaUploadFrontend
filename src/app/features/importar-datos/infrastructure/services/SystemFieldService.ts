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
    try {
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
    } catch {
      return [
        { id: 'sf-1',  name: 'RUT',               column: 'RUT',               required: true,  position: 1 },
        { id: 'sf-2',  name: 'Nombre Completo',    column: 'Nombre_Completo',   required: true,  position: 2 },
        { id: 'sf-3',  name: 'Dirección',          column: 'Direccion',         required: true,  position: 3 },
        { id: 'sf-4',  name: 'Teléfono Principal', column: 'Telefono_Principal',required: true,  position: 4 },
        { id: 'sf-5',  name: 'Teléfono Secundario',column: 'Telefono_Secundario',required: true, position: 5 },
        { id: 'sf-6',  name: 'Email',              column: 'Email',             required: true,  position: 6 },
        { id: 'sf-7',  name: 'Monto Deuda Original',column: 'Monto_Deuda_Original',required: true,position: 7 },
        { id: 'sf-8',  name: 'Monto Deuda Actual', column: 'Monto_Deuda_Actual',required: true,  position: 8 },
        { id: 'sf-9',  name: 'Fecha Vencimiento',  column: 'Fecha_Vencimiento', required: true,  position: 9 },
        { id: 'sf-10', name: 'Número Documento',   column: 'Numero_Documento',  required: true,  position: 10 },
        { id: 'sf-11', name: 'Producto',           column: 'Producto',          required: true,  position: 11 },
        { id: 'sf-12', name: 'Sucursal Origen',    column: 'Sucursal_Origen',   required: true,  position: 12 },
        { id: 'sf-13', name: 'Días Mora',          column: 'Dias_Mora',         required: true,  position: 13 },
        { id: 'sf-14', name: 'Tramo Mora',         column: 'Tramo_Mora',        required: true,  position: 14 },
      ];
    }
  }
}
