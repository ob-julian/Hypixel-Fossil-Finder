import { Component, AfterViewChecked } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewChecked {
    title = 'Hypixel Fossil Finder';
    private hasRun = false;

    ngAfterViewChecked(): void {
        if (this.hasRun) {
            return;
        }

        const htmldoc = (typeof document !== 'undefined') ? document : null;
        if (htmldoc) {
            const mainElement = htmldoc.getElementById("main");
            if (mainElement) {
                mainElement.style.display = "";
            }
            htmldoc.body.classList.remove("no-transition");
        }

        this.hasRun = true;
    }
}
