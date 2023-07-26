import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddArvorePage } from './add-arvore.page';

describe('AddArvorePage', () => {
  let component: AddArvorePage;
  let fixture: ComponentFixture<AddArvorePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddArvorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
