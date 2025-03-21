import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FossilEditorComponent } from './fossil-editor.component';

describe('FossilEditorComponent', () => {
    let component: FossilEditorComponent;
    let fixture: ComponentFixture<FossilEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FossilEditorComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(FossilEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
