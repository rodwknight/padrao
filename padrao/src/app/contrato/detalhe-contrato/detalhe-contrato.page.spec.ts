import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheContratoPage } from './detalhe-contrato.page';

describe('DetalheContratoPage', () => {
  let component: DetalheContratoPage;
  let fixture: ComponentFixture<DetalheContratoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheContratoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
