import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarServicoPage } from './criar-servico.page';

describe('CriarServicoPage', () => {
  let component: CriarServicoPage;
  let fixture: ComponentFixture<CriarServicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
