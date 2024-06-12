import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestmonyComponent } from './create-testmony.component';

describe('CreateTestmonyComponent', () => {
  let component: CreateTestmonyComponent;
  let fixture: ComponentFixture<CreateTestmonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTestmonyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTestmonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
