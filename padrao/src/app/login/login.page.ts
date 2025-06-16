import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'
import { LocalStorageService } from '../services/local-storage.service';
import { ListaEmpresa } from '../interfaces/listaEmpresa';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  protected loginForm: FormGroup
  protected empresas: ListaEmpresa[]
  private localStorageService = new LocalStorageService

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private empresaService: EmpresaService) {

    this.getListEmpresas()

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      empresa: ['', Validators.required],
    })
  }

  ngOnInit() {
    if (this.localStorageService.exists('accesskey')) {
      this.router.navigate(['/home'])
    }
  }

  public async onSubmit() {
    if (this.localStorageService.exists('config')) {
      if (this.loginForm.valid) {
        const { username, password, empresa } = this.loginForm.value;

        try {
          const { token, nome, usuarioId } = await firstValueFrom(this.authService.login(username, password, empresa))
          const localStorageService = new LocalStorageService()
          localStorageService.setItem('accesskey', token)
          localStorageService.setItem('usuario', {
            nome,
            usuarioId
          })

          if (token) {
            this.router.navigate(['/home'])
          }

        } catch (resError) {
          const { error } = resError as HttpErrorResponse

          const toast = await this.toastController.create({
            message: error,
            duration: 2000,
            color: 'danger'  // Defina a cor como 'danger' para mensagens de erro
          });
          await toast.present();
        }
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Sistema precisa ser configurado!',
        duration: 2000,
        color: 'danger'  // Defina a cor como 'danger' para mensagens de erro
      });
      await toast.present();
    }
  }

  public async create() {
    await firstValueFrom(this.authService.create())
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control && control.invalid && (control.dirty || control.touched) ? true : false;
  }

  private async getListEmpresas() {
    this.empresas = await lastValueFrom(this.empresaService.list) as ListaEmpresa[] || [] as ListaEmpresa[]
  }

}
