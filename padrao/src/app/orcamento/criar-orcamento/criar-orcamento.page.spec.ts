import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarOrcamentoPage } from './criar-orcamento.page';

describe('CriarOrcamentoPage', () => {
  let component: CriarOrcamentoPage;
  let fixture: ComponentFixture<CriarOrcamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarOrcamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
