import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivdOrderComponent } from './archivd-order.component';

describe('ArchivdOrderComponent', () => {
  let component: ArchivdOrderComponent;
  let fixture: ComponentFixture<ArchivdOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivdOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivdOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
