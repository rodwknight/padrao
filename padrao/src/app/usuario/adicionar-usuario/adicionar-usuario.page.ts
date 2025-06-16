import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.page.html',
  styleUrls: ['./adicionar-usuario.page.scss'],
})
export class AdicionarUsuarioPage implements OnInit {

  public usuarioForm: FormGroup

  constructor(private fb: FormBuilder,) {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      empresa: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  public async onSubmit() { }

}
