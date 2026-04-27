import { Component, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faServer, faEnvelope, faComments, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormSFTP } from '../../../../importar-datos/presentation/components/form.sftp/form.sftp';
import { FormEmail } from '../../../../importar-datos/presentation/components/form.email/form.email';
import { FormTeams } from '../../../../importar-datos/presentation/components/form.teams/form.teams';

@Component({
  selector: 'app-automatizar',
  imports: [FaIconComponent, RouterLink, NgClass, FormSFTP, FormEmail, FormTeams],
  templateUrl: './automatizar.html',
})
export class Automatizar {
  readonly faServer = faServer;
  readonly faEnvelope = faEnvelope;
  readonly faComments = faComments;
  readonly faArrowLeft = faArrowLeft;
  readonly originType = signal<'sftp' | 'email' | 'teams' | null>(null);

  selectOrigin(type: 'sftp' | 'email' | 'teams'): void {
    this.originType.set(type);
  }

  cancel(): void {
    this.originType.set(null);
  }
}
