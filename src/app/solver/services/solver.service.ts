import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fossil } from '../../models/fossil/fossil.model';
import { ColoredFossil } from '../../models/colored-fossil/colored-fossil.model';
import { CellState } from '../../models/cell-state/cell-state.model';
import { FossilService } from '../../fossils/services/fossil.service';


@Injectable({
    providedIn: 'root'
})
export class SolverService{
    private possibleFossils: BehaviorSubject<Array<[ColoredFossil, number]>> = new BehaviorSubject<Array<[ColoredFossil, number]>>([]);
    private nextExcavation: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([[]]);
    private message: BehaviorSubject<string> = new BehaviorSubject<string>('Not run yet');
    private allFossils: Fossil[] = [];

    constructor(private fossilService: FossilService) {
        this.fossilService.getFossils().subscribe(fossilsMap => {
            this.allFossils = Array.from(fossilsMap.values());
        });
    }

    getPossibleFossils(): Observable<Array<[ColoredFossil, number]>> {
        return this.possibleFossils.asObservable();
    }

    getNextExcavation(): Observable<number[][]> {
        return this.nextExcavation.asObservable();
    }

    getMessage(): Observable<string> {
        return this.message.asObservable();
    }

    reset(): void {
        this.possibleFossils.next([]);
        this.nextExcavation.next([]);
        this.message.next('Cleared');
    }

    solve(data: CellState[][]): void {
        const possibleFossilsTmp: Array<[ColoredFossil, number]> = [];
        const dataAccum: number[][] = Array.from({ length: data.length }, () => Array(data[0].length).fill(0)); 

        if (data.flat().filter(cell => cell === true).length > 0) {

            for (const fossil of this.allFossils) {
                const infoAccum: number[][][] = Array.from({ length: fossil.data.length }, () => 
                    Array.from({ length: fossil.data[0].length }, () => [])
                );
                const fossilCopy: ColoredFossil = ColoredFossil.copyFossil(fossil);

                fossilCopy.infos = infoAccum;

                const [isPossible, xTimes] = this._checkFossil(data, fossilCopy, dataAccum, infoAccum);
                if (isPossible) {
                    possibleFossilsTmp.push([fossilCopy, xTimes]);
                }
            }

            this.possibleFossils.next(possibleFossilsTmp);
            //this.possibleFossils.next([[new ColoredFossil(1, 'dummy', 'dummy', dataAccum), 1]]); // debug
        } else {
            const amountOfWrongCells = data.flat().filter(cell => cell === false).length;
            if (amountOfWrongCells === 0) {
                this.message.next('I will not show you that every fossil fits in an empty field, but let me give you the best starting tiles');
            } else {
                this.message.next('I will not show you that every fossil could somehow, somewhere fit in this field, but I will give you the best next tile');
            }
            
            for (const fossil of this.allFossils) {
                const colorFossil: ColoredFossil = ColoredFossil.copyFossil(fossil);
                this._checkFossilForEmpty(data, colorFossil, dataAccum);
            }

            // because we send a message we overwrite the default Fitting Fossil rendering so we need to manually update the message if empty
            if (dataAccum.flat().filter(cell => cell > 0).length === 0) {
                this.message.next('No fitting fossils found');
            }
            
        }
        this.nextExcavation.next(dataAccum);
    }

    private _checkFossil(data: CellState[][], fossilEditable: ColoredFossil, dataAccum: number[][], infoAccum: number[][][]): [boolean, number] {
        // check if length and width are correct
        if (fossilEditable.data.length > data.length || fossilEditable.data[0].length > data[0].length) {
            return [false, 0];
        }
        let returnVal: boolean = false;
        let increase: number = 2;
        for (let i = 0; i <= data.length - fossilEditable.data.length; i++) {
            for (let j = 0; j <= data[0].length - fossilEditable.data[0].length; j++) {
                if (this._checkFossilAtPosition(data, fossilEditable, i, j)) {

                    this._addDataToFossil(data, fossilEditable, i, j, increase);
                    this._addFossilToData(dataAccum, fossilEditable, i, j);
                    this._addIdPatternToInfos(data, infoAccum, i, j, increase);

                    increase++;
                    returnVal = true;
                }
            }
        }
        return [returnVal, increase - 2];
    }

    private _checkFossilAtPosition(data: CellState[][], fossil: ColoredFossil, x: number, y: number): boolean {
        let allUndefined: boolean = true; // make sure we dont try to fit a fossil in completely empty space
        let matchedCells: number = 0;
        for (let i = 0; i < fossil.data.length; i++) {
            for (let j = 0; j < fossil.data[0].length; j++) {
                const dataCell: CellState = data[x + i][y + j];
                if (dataCell === null) {
                    continue;
                } else {
                    allUndefined = false;
                    const fossilCell: number = fossil.data[i][j];
                    
                    // check if cells are matching otherwise we dont have a match
                    // I separated the cases because of number and boolean
                    if (fossilCell !== 0 && dataCell === true){
                        matchedCells++;
                        continue;
                    } else if (fossilCell === 0 && dataCell === false) {
                        continue;
                    } else {
                        return false;
                    }
                }
                    
            }
        }
        if (allUndefined) {
            return false;
        }
        if (matchedCells === 0) {
            return false;
        }
        // functionally check if all cells are matching
        const toMatchCells = data.reduce((acc, row) => acc + row.reduce((acc, cell) => acc + (cell === true ? 1 : 0), 0), 0);
        return matchedCells === toMatchCells;
    }

    private _addDataToFossil(data: CellState[][], fossil: ColoredFossil, x: number, y: number, increase: number): void {
        for (let i = 0; i < fossil.data.length; i++) {
            for (let j = 0; j < fossil.data[0].length; j++) {
                if (data[x + i][y + j] === true) {
                    fossil.data[i][j] += increase;
                }
            }
        }
    }

    private _addFossilToData(dataAccum: number[][], fossil: ColoredFossil, x: number, y: number): void {
        for (let i = 0; i < fossil.data.length; i++) {
            for (let j = 0; j < fossil.data[0].length; j++) {
                if (fossil.data[i][j] > 0) {
                    dataAccum[x + i][y + j]++;
                }
            }
        }
    }

    private _addIdPatternToInfos(data: CellState[][], infos: number[][][], x: number, y: number, increase: number): void {
        for (let i = 0; i < infos.length; i++) {
            for (let j = 0; j < infos[0].length; j++) {
                if (data[x + i][y + j] === true) {
                    infos[i][j].push(increase + 1);
                }
            }
        }
    }


    private _checkFossilForEmpty(data: CellState[][], fossile: ColoredFossil, dataAccum: number[][]): void {
        // check if length and width are correct
        if (fossile.data.length > data.length || fossile.data[0].length > data[0].length) {
            return;
        }
        for (let i = 0; i <= data.length - fossile.data.length; i++) {
            for (let j = 0; j <= data[0].length - fossile.data[0].length; j++) {
                if (this._checkFossilAtPositionForEmpty(data, fossile, i, j)) {
                    this._addFossilToData(dataAccum, fossile, i, j);
                }
            }
        }
        return;
    }

    private _checkFossilAtPositionForEmpty(data: CellState[][], fossil: ColoredFossil, x: number, y: number): boolean {
        for (let i = 0; i < fossil.data.length; i++) {
            for (let j = 0; j < fossil.data[0].length; j++) {
                const dataCell: CellState = data[x + i][y + j];
                if (dataCell === null) {
                    continue;
                } else {
                    const fossilCell: number = fossil.data[i][j];
                    
                    // we need to only check for false cells cause if any is true we will not be in this algorithm
                    if (fossilCell === 0 && dataCell === false) {
                        continue;
                    } else {
                        return false;
                    }
                }
                    
            }
        }
        return true;
    }
        
}
