import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { lastValueFrom } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { PropostaService } from '../services/proposta.service';
import { ListaProposta } from '../interfaces/lista-proposta';
import { listaStatusProposta } from '../enums/status-proposta';


@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.page.html',
  styleUrls: ['./proposta.page.scss'],
})
export class PropostaPage implements OnInit {

  public propostas: ListaProposta[]
  private _localStorage: LocalStorageService<unknown>
  private _loading: HTMLIonLoadingElement

  constructor(private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private propostaService: PropostaService) {

    this.propostas = [] as ListaProposta[]
    this._localStorage = new LocalStorageService()
    this._loading = {} as HTMLIonLoadingElement

    if (!this._localStorage.exists('accesskey')) {
      this.router.navigate(['/'])
    }
  }

  async ngOnInit() {
    await this.resolveLoading()
    this.propostas = await this.buscaLista() as ListaProposta[]
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

  public labelStatus(status: number): string {
    return listaStatusProposta.get(status)?.label as string
  }

  public typeStatus(status: number): string {
    return listaStatusProposta.get(status)?.type as string
  }

  public detalheProposta(proposta: ListaProposta): void {
    this.router.navigate(['/proposta/detalhe-proposta'], {
      state: {
        proposta
      }
    })
  }

  private async buscaLista(): Promise<ListaProposta[]> {

    this._loading.present()

    const { propostas } = await lastValueFrom(this.propostaService.list())

    this._loading.dismiss()

    return await propostas as ListaProposta[]
  }

  private resolveLoading = async () => {
    this._loading = await this.loadingCtrl.create({
      message: 'Buscando propostas...'
    })
  }

}
