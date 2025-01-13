import { Component, OnInit } from '@angular/core'
import { LocalStorageService } from '../services/local-storage.service'
import { HomePage } from '../home/home.page'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { ClienteService } from '../services/cliente.service'
import { lastValueFrom } from 'rxjs'
import { LoadingController } from '@ionic/angular'
import { FormCliente } from '../interfaces/form-clientes'


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  private localStorage = new LocalStorageService()
  public backPage = HomePage

  public clientes = [] as FormCliente[]

  constructor(private authService: AuthService,
    private router: Router,
    private clienteService: ClienteService,
    private loadingCtrl: LoadingController) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/'])
    }
  }

  async ngOnInit() {
    this.clientes = await this.buscaLista() as FormCliente[]
  }

  public logout = (): void => {
    if (this.localStorage.exists('accesskey')) {
      this.authService.logout()
    }
    this.router.navigate(['/'])
  }

  public adicionarCliente = (): void => {
    this.router.navigate(['/cliente/adicionar-cliente'])
  }

  private async buscaLista(): Promise<FormCliente[]> {

    const loading = await this.loadingCtrl.create({
      message: 'Buscando clientes...'
    });

    loading.present()

    const { clientes } = await lastValueFrom(this.clienteService.list())

    loading.dismiss()

    return await clientes as FormCliente[]
  }

}
