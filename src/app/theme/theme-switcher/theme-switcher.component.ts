import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { FormsModule } from '@angular/forms';
@Component({
    selector: 'theme-switcher',
    imports: [FormsModule],
    templateUrl: './theme-switcher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './theme-switcher.component.css'
})
export class ThemeSwitcherComponent implements OnInit {
    availableThemes: string[] = [];
    selectedTheme: string = '';

    ngOnInit(): void {
        this.availableThemes = (typeof window !== 'undefined') ? (window as any).availableThemes || [] : [];
        this.selectedTheme = (typeof localStorage !== 'undefined') ? localStorage.getItem('theme') || 'auto' : 'auto';
    }

    capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
