import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnidadePage } from './unidade.page';

describe('UnidadePage', () => {
  let component: UnidadePage;
  let fixture: ComponentFixture<UnidadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
