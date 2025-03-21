import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
    title = 'Hypixel Fossil Finder';

    ngAfterViewInit(): void {
        const htmldoc = (typeof document !== 'undefined') ? document : null;
        if (htmldoc) {
            const mainElement = htmldoc.getElementById("main");
            if (mainElement) {
                mainElement.style.display = "";
            }
            htmldoc.body.classList.remove("no-transition");
        }
        
    }
}
