import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheOrdemPage } from './detalhe-ordem.page';

describe('DetalheOrdemPage', () => {
  let component: DetalheOrdemPage;
  let fixture: ComponentFixture<DetalheOrdemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheOrdemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
