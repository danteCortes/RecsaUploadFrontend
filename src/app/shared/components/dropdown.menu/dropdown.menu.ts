import { Component, input, signal } from "@angular/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { RouterLink } from "@angular/router";


@Component({
    selector: 'dropdown-menu',
	imports: [FontAwesomeModule, RouterLink],
	templateUrl: './dropdown.menu.html',
})

export class DropdownMenu {

    title = input<string>('');
    subtitles = input<{text: string; href: string;}[]>([]);
    icon = input<IconDefinition>()
    
	faAngleRight = faAngleRight;

	isOpen = signal(false);

	toggle(){
		this.isOpen.update(v => !v);
	}
}