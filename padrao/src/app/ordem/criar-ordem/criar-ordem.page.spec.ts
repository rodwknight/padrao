import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarOrdemPage } from './criar-ordem.page';

describe('CriarOrdemPage', () => {
  let component: CriarOrdemPage;
  let fixture: ComponentFixture<CriarOrdemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarOrdemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
