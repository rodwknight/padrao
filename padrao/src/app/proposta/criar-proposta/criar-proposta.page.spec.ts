import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarPropostaPage } from './criar-proposta.page';

describe('CriarPropostaPage', () => {
  let component: CriarPropostaPage;
  let fixture: ComponentFixture<CriarPropostaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPropostaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
