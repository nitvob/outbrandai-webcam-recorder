import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastUploadsComponent } from './past-uploads.component';

describe('PastUploadsComponent', () => {
  let component: PastUploadsComponent;
  let fixture: ComponentFixture<PastUploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastUploadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
