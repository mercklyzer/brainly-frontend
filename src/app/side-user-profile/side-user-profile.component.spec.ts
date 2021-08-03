import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideUserProfileComponent } from './side-user-profile.component';

describe('SideUserProfileComponent', () => {
  let component: SideUserProfileComponent;
  let fixture: ComponentFixture<SideUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
