import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhePropostaPage } from './detalhe-proposta.page';

describe('DetalhePropostaPage', () => {
  let component: DetalhePropostaPage;
  let fixture: ComponentFixture<DetalhePropostaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhePropostaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
