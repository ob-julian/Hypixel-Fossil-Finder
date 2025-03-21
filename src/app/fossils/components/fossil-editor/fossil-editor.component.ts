import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Fossil } from '../../../models/fossil/fossil.model';

@Component({
    selector: 'fossil-editor',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './fossil-editor.component.html',
    styleUrl: './fossil-editor.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FossilEditorComponent implements OnInit {
    @Input() fossil: Fossil = new Fossil();
    @Output() cancel = new EventEmitter<void>();
    @Output() save = new EventEmitter<Fossil>();

    fossilCopy: Fossil = new Fossil();
    hasError: boolean = false;
    error: string = '';

    ngOnInit(): void {
        this.fossilCopy = JSON.parse(JSON.stringify(this.fossil));
    }

    saveFossil(): void {
        // trimming for good measure
        this.fossilCopy.name = this.fossilCopy.name.trim();
        this.fossilCopy.description = this.fossilCopy.description.trim();
        if (this.fossilCopy.name === '') {
            this.hasError = true;
            this.error = 'Fossil name cannot be empty';
            return;
        }
        if (this.fossilCopy.description === '') {
            this.hasError = true;
            this.error = 'Fossil description cannot be empty';
            return;
        }
        // reduce the size of the data array
        // columns
        const oldData: boolean[][] = JSON.parse(JSON.stringify(this.fossilCopy.data));
        this.fossilCopy.data = this.fossilCopy.data.filter(row => row.some(cell => cell));
        if (this.fossilCopy.data.length === 0) {
            this.hasError = true;
            this.error = 'Fossil data cannot be empty';
            this.fossilCopy.data = oldData;
            return;
        }
        // array cant be empty or get empty
        for (let i = this.fossilCopy.data[0].length - 1; i >= 0; i--) {
            if (this.fossilCopy.data.every(row => !row[i])) {
                this.fossilCopy.data.forEach(row => row.splice(i, 1));
            }
        }

        this.hasError = false;
        this.save.emit(this.fossilCopy);
    }

    cancelEdit(): void {
        this.cancel.emit();
    }

    addRowRight() {
        this.fossilCopy.data.push(Array(this.fossilCopy.data[0].length).fill(false));
    }

    addRowLeft() {
        this.fossilCopy.data.unshift(Array(this.fossilCopy.data[0].length).fill(false));
    }

    addColumnBottom() {
        this.fossilCopy.data.forEach(row => row.push(false));
    }

    addColumnTop() {
        this.fossilCopy.data.forEach(row => row.unshift(false));
    }

    toggleGreenPanel(rowIndex: number, cellIndex: number) {
        const cell = this.fossilCopy.data[rowIndex][cellIndex];
        this.fossilCopy.data[rowIndex][cellIndex] = cell ? false : true;
    }

    rotateLeft() {
        const newData = [];
        for (let i = 0; i < this.fossilCopy.data[0].length; i++) {
            const newRow = [];
            for (let j = this.fossilCopy.data.length - 1; j >= 0; j--) {
                newRow.push(this.fossilCopy.data[j][i]);
            }
            newData.push(newRow);
        }
        this.fossilCopy.data = newData;
    }

    rotateRight() {
        const newData = [];
        for (let i = this.fossilCopy.data[0].length - 1; i >= 0; i--) {
            const newRow = [];
            for (let j = 0; j < this.fossilCopy.data.length; j++) {
                newRow.push(this.fossilCopy.data[j][i]);
            }
            newData.push(newRow);
        }
        this.fossilCopy.data = newData;
    }

    flipHorizontal() {
        this.fossilCopy.data = this.fossilCopy.data.map(row => row.reverse());
    }

    flipVertical() {
        this.fossilCopy.data = this.fossilCopy.data.reverse();
    }
}
