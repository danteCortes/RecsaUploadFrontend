import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faArrowUpFromBracket, faCheck, faCheckSquare, faCog, faDatabase, faPaperPlane, faFileLines, faXmark } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'importar-datos',
    templateUrl: './index.html',
    imports: [RouterLink, FaIconComponent, RouterOutlet]
})

export class ImportarDatosIndex {
    faArrowUpFromBracket = faArrowUpFromBracket;
    faCog = faCog;
    faCheckSquare = faCheckSquare;
    faDatabase = faDatabase;
    faPaperPlane = faPaperPlane;
    faCheck = faCheck;
    faFileLines = faFileLines;
    faXmark = faXmark;

    files: File[] = [];

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.addFiles(input.files);
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault(); // necesario para permitir drop
    }

    onDrop(event: DragEvent) {
        event.preventDefault();

        if (event.dataTransfer?.files) {
            this.addFiles(event.dataTransfer.files);
        }
    }

    addFiles(fileList: FileList) {
        const newFiles = Array.from(fileList);

        // opcional: evitar duplicados por nombre
        const uniqueFiles = newFiles.filter(
            newFile => !this.files.some(f => f.name === newFile.name)
        );

        this.files = [...this.files, ...uniqueFiles];
    }
}