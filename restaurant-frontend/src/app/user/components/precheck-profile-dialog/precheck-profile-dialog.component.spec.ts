import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecheckProfileDialogComponent } from './precheck-profile-dialog.component';

describe('PrecheckProfileDialogComponent', () => {
  let component: PrecheckProfileDialogComponent;
  let fixture: ComponentFixture<PrecheckProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecheckProfileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecheckProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
