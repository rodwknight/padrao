import { Component, OnInit } from '@angular/core';
import { ListaUsuarios } from '../interfaces/lista-usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  protected usuarios: ListaUsuarios[]

  constructor(private router: Router) {

    this.usuarios = [] as ListaUsuarios[]
  }

  ngOnInit() {
  }

  public adicionarUsuario = () => {
    this.router.navigate(['/usuario/adicionar-usuario'])
  }

  public onSearchChange(e: any) {

  }

}
