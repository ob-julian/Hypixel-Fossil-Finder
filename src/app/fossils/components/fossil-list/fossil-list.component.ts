

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Fossil } from '../../../models/fossil/fossil.model';
import { FossilService } from '../../services/fossil.service';
import { FossilViewerComponent } from "../fossil-viewer/fossil-viewer.component";
import { FossilEditorComponent } from "../fossil-editor/fossil-editor.component";
import { ThemeSwitcherComponent } from "../../../theme/theme-switcher/theme-switcher.component";

@Component({
    selector: 'fossil-list',
    standalone: true,
    imports: [CommonModule, FossilViewerComponent, FossilEditorComponent, ThemeSwitcherComponent],
    templateUrl: './fossil-list.component.html',
    styleUrl: './fossil-list.component.css'
})

export class FossilListComponent implements OnInit {

    
    fossils: Map<number, Fossil> = new Map();
    editingFossils: Set<number> = new Set();
    newFossilEditors: Array<{}> = [];
    maxIndex: number = 0;
    willDeleteAll: boolean = false;

    constructor(private fossilService: FossilService, private router: Router) { }

    ngOnInit(): void {
        this.fossilService.getFossils().subscribe(fossils => {
            this.fossils = fossils;
            this.maxIndex = Math.max(...Array.from(this.fossils.keys()));
        });
    }


    // trackby is needed in order to stop the wrong detection of changes, e.g editors updating when another editor is saved
    // reason: the fossils are stored in a map so changes to one elemets in the map trigger a change detection for the map itself that is propagated to all elements
    trackByFossilKey(index: number, fossil: any): string {
        return fossil.key;
    }

    enableFossilEdit(fossilId: number): void {
        this.editingFossils.add(fossilId);
    }

    hideFossilEdit(fossilId: number): void {
        this.editingFossils.delete(fossilId);
    }

    deleteFossil(fossilId: number): void {
        this.fossilService.deleteFossil(fossilId);
    }

    addFossil(fossil: Fossil): void {
        this.fossilService.addFossil(fossil);
    }

    addFossilEditor(): void {
        this.newFossilEditors.push({});
    }

    removeFossilEditor(index: number) {
        this.newFossilEditors.splice(index, 1);
    }

    tryDeleteLocalFossils(): void {
        this.willDeleteAll = true;
    }

    deleteLocalFossil(): void {
        localStorage.removeItem('fossils');
        this.fossilService.initFossils();
        this.willDeleteAll = false;
    }

    cancelDeleteLocalFossil(): void {
        this.willDeleteAll = false;
    }

    toSolver(): void {
        this.router.navigate(['/solver']);
    }

    saveUpdatedFossil(fossil: Fossil): void {
        this.fossilService.updateFossil(fossil);
    }

}
