import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmestajComponentComponent } from './smestaj-component.component';

describe('SmestajComponentComponent', () => {
  let component: SmestajComponentComponent;
  let fixture: ComponentFixture<SmestajComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmestajComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmestajComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});