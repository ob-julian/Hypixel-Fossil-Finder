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
        const mainElement = document.getElementById("main");
        if (mainElement) {
            mainElement.style.display = "";
        }
    }
}
