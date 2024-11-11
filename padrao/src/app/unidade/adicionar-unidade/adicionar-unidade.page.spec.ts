import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarUnidadePage } from './adicionar-unidade.page';

describe('AdicionarUnidadePage', () => {
  let component: AdicionarUnidadePage;
  let fixture: ComponentFixture<AdicionarUnidadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarUnidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
