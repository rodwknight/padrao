import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { ListaContrato } from '../interfaces/lista-contrato';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { listaStatusContrato } from '../enums/status-contrato';
import { ContratoService } from '../services/contrato.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
})
export class ContratoPage implements OnInit {

  public contratos: ListaContrato[]
  private _localStorage: LocalStorageService<unknown>
  private _loading: HTMLIonLoadingElement
  private _toast: HTMLIonToastElement

  constructor(private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private contratoService: ContratoService) {

    this.contratos = [] as ListaContrato[]
    this._localStorage = new LocalStorageService()
    this._loading = {} as HTMLIonLoadingElement
    this._toast = {} as HTMLIonToastElement

    if (!this._localStorage.exists('accesskey')) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.contratos = await this.buscaLista()
  }

  public labelStatus(status: number): string {
    return listaStatusContrato.get(status)?.label as string
  }

  public typeStatus(status: number): string {
    return listaStatusContrato.get(status)?.type as string
  }

  public detalheContrato(contrato: ListaContrato): void {
    this.router.navigate(['/contrato/detalhe-contrato'], {
      state: {
        contrato
      }
    })
  }

  public async aprovar(contratoSelecionada: ListaContrato): Promise<void> {
    await this.resolveLoading()
    this._loading.present()
    const { contratos, success, message } = await firstValueFrom(this.contratoService.update(contratoSelecionada, 2))
    this._loading.dismiss()

    if (success) {
      this.contratos = contratos
      await this.resolveToast('Contrato aprovado com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }

  public async reprovar(contratoSelecionada: ListaContrato): Promise<void> {
    await this.resolveLoading()
    this._loading.present()
    const { contratos, success, message } = await firstValueFrom(this.contratoService.update(contratoSelecionada, 3))
    this._loading.dismiss()

    if (success) {
      this.contratos = contratos
      await this.resolveToast('Contrato aprovado com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }

  private async buscaLista(): Promise<ListaContrato[]> {
    await this.resolveLoading()

    this._loading.present()

    const { contratos } = await firstValueFrom(this.contratoService.list())

    const retorno = await contratos.map((contrato: ListaContrato) => {

      const { propostas: [proposta] } = contrato

      return {
        id: contrato.id,
        codContrato: contrato.codContrato,
        status: contrato.status,
        ...proposta,
        createAt: contrato.createdAt
      }
    }) as ListaContrato[]

    this._loading.dismiss()

    return retorno
  }

  private resolveLoading = async (): Promise<void> => {
    this._loading = await this.loadingCtrl.create({
      message: 'Buscando contratos...'
    })
  }

  private async resolveToast(message: string, color: string): Promise<void> {
    this._toast = await this.toastCtrl.create({
      message,
      color,
      duration: 5000,
      position: 'bottom',
    });
  }

}
