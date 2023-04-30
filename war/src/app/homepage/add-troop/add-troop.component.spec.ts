import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTroopComponent } from './add-troop.component';

describe('AddTroopComponent', () => {
  let component: AddTroopComponent;
  let fixture: ComponentFixture<AddTroopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTroopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTroopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
