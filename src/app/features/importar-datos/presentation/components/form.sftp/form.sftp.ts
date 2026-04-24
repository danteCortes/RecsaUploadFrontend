import { Component, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEthernet, faFolder, faKey, faServer, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './form.sftp.html',
  selector: 'app-form-sftp',
  imports: [FaIconComponent],
})
export class FormSFTP {
  readonly faServer = faServer;
  readonly faUser = faUser;
  readonly faKey = faKey;
  readonly faEthernet = faEthernet;
  readonly faFolder = faFolder;

  readonly showPassword = signal<boolean>(false);
}
