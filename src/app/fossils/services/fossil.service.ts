import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fossil } from '../../models/fossil/fossil.model';
import fossilsData from '../../../assets/fossils.json';

@Injectable({
    providedIn: 'root'
})



export class FossilService {
    private fossils: BehaviorSubject<Map<number, Fossil>> = new BehaviorSubject<Map<number, Fossil>>(new Map());
    private fossilsCORS: BehaviorSubject<[string, Fossil]> = new BehaviorSubject<[string, Fossil]>(['initial', new Fossil()]);

    constructor() {
        this.initFossils();
    }

    initFossils(): void {
        //const storedFossils = localStorage.getItem('fossils');
        const storedFossils = (typeof localStorage !== 'undefined') ? localStorage.getItem('fossils') : false; // false or null tbh doesnt matter

        let fossilsMap = new Map<number, Fossil>();

        if (storedFossils) {
            const storedFossilsArray: Fossil[] = JSON.parse(storedFossils);
            fossilsMap = new Map<number, Fossil>(storedFossilsArray.map(fossil => [fossil.id, fossil]));
        } else {
            // Use the given JSON data otherwise
            const initialFossils: Fossil[] = fossilsData;
            fossilsMap = new Map<number, Fossil>(initialFossils.map(fossil => [fossil.id, fossil]));
        }
        this.fossils.next(fossilsMap);
    }

    getFossils(): Observable<Map<number, Fossil>> {
        return this.fossils.asObservable();
    }

    getFossilUpdates(): Observable<[string, Fossil]> {
        return this.fossilsCORS.asObservable();
    }

    addFossil(fossil: Fossil): void {
        let fossilsMap = this.fossils.getValue();
        // chek if the fossil id is already in the map
        const existingFossil = fossilsMap.get(fossil.id);
        if (existingFossil) {
            const newFossilsMap = new Map<number, Fossil>();
            let inserted = false;
    
            fossilsMap.forEach((value, key) => {
                if (inserted) {
                    const newKey = key + 1;
                    const fossil = value;
                    fossil.id = newKey;
                    newFossilsMap.set(newKey, fossil);
                } else {
                    newFossilsMap.set(key, value);
                }

                if (key === fossil.id && !inserted) {
                    fossil.id = key + 1;
                    newFossilsMap.set(fossil.id, fossil);
                    inserted = true;
                }
                
            });
            fossilsMap = newFossilsMap;
        } else {
            fossilsMap.set(fossil.id, fossil);
        }

        this.fossils.next(fossilsMap);
        this.saveFossilsToLocalStorage(fossilsMap);
    }

    updateFossil(fossil: Fossil): void {
        const fossilsMap = this.fossils.getValue();
        fossilsMap.set(fossil.id, fossil);
        this.fossils.next(fossilsMap);
        this.saveFossilsToLocalStorage(fossilsMap);
    }

    deleteFossil(fossilId: number): void {
        const fossilsMap = this.fossils.getValue();
        fossilsMap.delete(fossilId);
        this.fossils.next(fossilsMap);
        //this.deleteFossilFromLocalStorage(fossilId);
        this.saveFossilsToLocalStorage(fossilsMap);
    }

    private saveFossilsToLocalStorage(fossilsMap: Map<number, Fossil>): void {
        const fossils = Array.from(fossilsMap.values());
        localStorage.setItem('fossils', JSON.stringify(fossils));
    }
}