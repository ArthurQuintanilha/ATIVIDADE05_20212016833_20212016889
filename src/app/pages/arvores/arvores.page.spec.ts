import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArvoresPage } from './arvores.page';

describe('ArvoresPage', () => {
  let component: ArvoresPage;
  let fixture: ComponentFixture<ArvoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArvoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
