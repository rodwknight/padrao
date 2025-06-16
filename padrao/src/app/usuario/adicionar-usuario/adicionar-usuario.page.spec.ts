import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarUsuarioPage } from './adicionar-usuario.page';

describe('AdicionarUsuarioPage', () => {
  let component: AdicionarUsuarioPage;
  let fixture: ComponentFixture<AdicionarUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
