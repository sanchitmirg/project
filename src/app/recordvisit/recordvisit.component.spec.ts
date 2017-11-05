import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordvisitComponent } from './recordvisit.component';

describe('RecordvisitComponent', () => {
  let component: RecordvisitComponent;
  let fixture: ComponentFixture<RecordvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
