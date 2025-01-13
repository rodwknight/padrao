import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { FormProposta } from '../interfaces/form-proposta';
import { lastValueFrom } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { PropostaService } from '../services/proposta.service';


@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.page.html',
  styleUrls: ['./proposta.page.scss'],
})
export class PropostaPage implements OnInit {

  private _localStorage: LocalStorageService<unknown>
  private _loading: HTMLIonLoadingElement

  constructor(private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private propostaService: PropostaService) {

    this._localStorage = new LocalStorageService()
    this._loading = {} as HTMLIonLoadingElement

    if (!this._localStorage.exists('accesskey')) {
      this.router.navigate(['/'])
    }
  }

  async ngOnInit() {
    await this.resolveLoading()
    this.buscaLista()
  }

  public logout = (): void => {
    if (this._localStorage.exists('accesskey')) {
      this.authService.logout()
    }
    this.router.navigate(['/'])
  }

  public criarProposta = (): void => {
    this.router.navigate(['/proposta/criar-proposta'])
  }

  private async buscaLista(): Promise<FormProposta[]> {

    this._loading.present()

    const { propostas } = await lastValueFrom(this.propostaService.list())

    this._loading.dismiss()

    return await propostas as FormProposta[]
  }

  private resolveLoading = async () => {
    this._loading = await this.loadingCtrl.create({
      message: 'Buscando propostas...'
    })
  }

}
