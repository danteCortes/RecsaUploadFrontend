import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './form.email.html',
  selector: 'app-form-email',
  imports: [FaIconComponent],
})
export class FormEmail {
  readonly faEnvelope = faEnvelope;
  readonly faFolder = faFolder;
}
