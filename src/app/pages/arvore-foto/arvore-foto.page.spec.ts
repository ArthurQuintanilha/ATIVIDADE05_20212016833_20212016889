import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArvoreFotoPage } from './arvore-foto.page';

describe('ArvoreFotoPage', () => {
  let component: ArvoreFotoPage;
  let fixture: ComponentFixture<ArvoreFotoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArvoreFotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
