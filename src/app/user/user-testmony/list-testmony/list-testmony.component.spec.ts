import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTestmonyComponent } from './list-testmony.component';

describe('ListTestmonyComponent', () => {
  let component: ListTestmonyComponent;
  let fixture: ComponentFixture<ListTestmonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTestmonyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTestmonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
