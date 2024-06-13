import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningToolComponent } from './planning-tool.component';

describe('PlanningToolComponent', () => {
  let component: PlanningToolComponent;
  let fixture: ComponentFixture<PlanningToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
