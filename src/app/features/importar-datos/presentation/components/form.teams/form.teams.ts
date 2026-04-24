import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFolder, faMessage } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './form.teams.html',
  selector: 'app-form-teams',
  imports: [FaIconComponent],
})
export class FormTeams {
  readonly faMessage = faMessage;
  readonly faFolder = faFolder;
}
