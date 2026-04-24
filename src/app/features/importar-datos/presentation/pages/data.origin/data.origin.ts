import { Component, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faServer, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormSFTP } from '../../components/form.sftp/form.sftp';
import { FormEmail } from '../../components/form.email/form.email';
import { FormTeams } from '../../components/form.teams/form.teams';

@Component({
  templateUrl: './data.origin.html',
  selector: 'app-data-origin',
  imports: [FaIconComponent, RouterLink, NgClass, FormSFTP, FormEmail, FormTeams],
})
export class DataOrigin {
  readonly faServer = faServer;
  readonly faEnvelope = faEnvelope;
  readonly faArrowLeft = faArrowLeft;
  readonly faCheck = faCheck;

  readonly originType = signal<'sftp' | 'email' | 'teams' | null>(null);
}
