import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaFossil } from '../../../models/meta-fossil/meta-fossil.model';
import { ColoredFossil } from '../../../models/colored-fossil/colored-fossil.model';

@Component({
    selector: 'fossil-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './fossil-view.component.html',
    styleUrl: './fossil-view.component.css'
})
export class FossilViewComponent {
    @Input() fossil: MetaFossil = new MetaFossil();
    
    private lookUpColorObj: { [key: number]: string } = {
        1: 'green',
        2: 'red',
        3: 'orange',
        4: 'pink',
        5: 'yellow',
        6: 'lime',
        7: 'light_blue',
        8: 'cyan',
        9: 'blue',
        10: 'magenta',
        11: 'purple',
        12: 'brown',
        13: 'light_gray',
        14: 'black',
        15: 'white',
        16: 'gray', // exists but is to similar to default background
    }

    lookUpColor(id: number): string {
        if (typeof id == 'boolean') {
            id = id ? 1 : 0; //thx typescript you are not helping
        }
        // nobody likes magic numbers
        if (id < 0) {
            id = 0;
        }
        if (id > 15) {
            id = 15;
        }
        return this.lookUpColorObj[id];
    }

    getCellInfo(row: number, col: number): string {
        return this._wrapperGetCellInfo(row, col).replace(/_/g, ' ');
    }

    private _wrapperGetCellInfo(row: number, col: number): string {
        if (this.fossil instanceof ColoredFossil) {
            if (this.fossil.infos[row][col].length === 1) {
                return 'Part of Fossil ' + this.lookUpColor(this.fossil.infos[row][col][0]);
            } else if (this.fossil.infos[row][col].length > 1) {
                const fossilNames = this.fossil.infos[row][col].map(id => this.lookUpColor(id)).join(', ');
                return 'Part of Fossils ' + fossilNames;
            }
        }
        return '';
    }

    trackByIndex(index: number, item: any): number {
        return index;
    }    
    

}
