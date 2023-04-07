import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferContentComponent } from './transfer-content.component';

describe('TransferContentComponent', () => {
  let component: TransferContentComponent;
  let fixture: ComponentFixture<TransferContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
