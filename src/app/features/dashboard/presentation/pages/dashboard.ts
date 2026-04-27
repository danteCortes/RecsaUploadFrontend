import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRobot, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  faRobot = faRobot;
  faArrowUpFromBracket = faArrowUpFromBracket;
}
