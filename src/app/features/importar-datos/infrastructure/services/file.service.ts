import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileService {
  async save(files: File[]): Promise<void> {
    console.log(files);
  }
}
