import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fossil } from '../../../models/fossil/fossil.model';
import { FossilService } from '../../services/fossil.service';
import { FossilViewComponent } from '../../../common/component/fossil-view/fossil-view.component';

@Component({
    selector: 'fossil-viewer',
    standalone: true,
    imports: [CommonModule, FossilViewComponent],
    templateUrl: './fossil-viewer.component.html',
    styleUrl: './fossil-viewer.component.css'
})
export class FossilViewerComponent {
    @Input() fossil: Fossil = new Fossil();
    @Output() edit = new EventEmitter<number>();
    @Output() delete = new EventEmitter<number>();

    willDelete: boolean = false;

    constructor(private fossilService: FossilService) {}

    enableFossilEdit(): void {
        this.edit.emit(this.fossil.id);
    }

    duplicateFossil(): void {
        // change behavior between production and development
        if (process.env['NODE_ENV'] === 'production')  {
            const newFossil = new Fossil();
            newFossil.id = this.fossil.id;
            newFossil.name = this.fossil.name + ' (copy)';
            newFossil.description = this.fossil.description;
            newFossil.data = JSON.parse(JSON.stringify(this.fossil.data));
            this.fossilService.addFossil(newFossil);
        } else {
            const newFossil = new Fossil();
            newFossil.id = this.fossil.id;
            newFossil.name = this.fossil.name;
            newFossil.description = this.fossil.description;
            // increase numbers in description by 1, to simplyfy dublicating variants
            const matches = this.fossil.description.match(/\d+/);
            console.log(matches);
            if (matches) {
                const number = parseInt(matches[0], 10) + 1;
                newFossil.description = this.fossil.description.replace(/\d+/, number.toString());
            }
            newFossil.data = JSON.parse(JSON.stringify(this.fossil.data));
            this.fossilService.addFossil(newFossil);

        }

    }

    wantsToDeleteFossil(): void {
        this.willDelete = true;
    }


    deleteFossil(): void {
        this.delete.emit(this.fossil.id);
    }

    cancelDelete(): void {
        this.willDelete = false;
    }
}
