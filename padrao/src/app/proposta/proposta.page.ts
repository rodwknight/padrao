import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { firstValueFrom } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
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
  private _toast: HTMLIonToastElement

  constructor(private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private propostaService: PropostaService) {

    this.propostas = [] as ListaProposta[]
    this._localStorage = new LocalStorageService()
    this._loading = {} as HTMLIonLoadingElement
    this._toast = {} as HTMLIonToastElement

    if (!this._localStorage.exists('accesskey')) {
      this.router.navigate(['/'])
    }

  }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.propostas = await this.buscaLista() as ListaProposta[]
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

  public async aprovar(propostaSelecionada: ListaProposta) {
    await this.resolveLoading()
    this._loading.present()
    const { propostas, success, message } = await firstValueFrom(this.propostaService.update(propostaSelecionada))
    this._loading.dismiss()

    if (success) {
      this.propostas = propostas
      await this.resolveToast('Proposta aprovada com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }

  private async buscaLista(): Promise<ListaProposta[]> {
    await this.resolveLoading()

    this._loading.present()

    const { propostas } = await firstValueFrom(this.propostaService.list())

    this._loading.dismiss()

    return await propostas as ListaProposta[]
  }

  private resolveLoading = async () => {
    this._loading = await this.loadingCtrl.create({
      message: 'Buscando propostas...'
    })
  }


  private async resolveToast(message: string, color: string) {
    this._toast = await this.toastCtrl.create({
      message,
      color,
      duration: 5000,
      position: 'bottom',
    });
  }

}
