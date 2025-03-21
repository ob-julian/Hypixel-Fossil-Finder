import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FossilListComponent } from './fossil-list.component';

describe('FossilListComponent', () => {
    let component: FossilListComponent;
    let fixture: ComponentFixture<FossilListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FossilListComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(FossilListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
