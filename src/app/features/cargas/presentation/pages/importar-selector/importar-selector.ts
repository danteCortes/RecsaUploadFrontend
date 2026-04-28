import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRobot, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-importar-selector',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './importar-selector.html',
})
export class ImportarSelector {
  faRobot = faRobot;
  faArrowUpFromBracket = faArrowUpFromBracket;
}
