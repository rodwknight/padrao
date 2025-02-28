import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { OrdemService } from '../services/ordem.service';
import { FormOrdem } from '../interfaces/form-ordem';
import { LocalStorageService } from '../services/local-storage.service';
import { listaStatusOrdem } from '../enums/status-ordem';
import { ListaOrdem } from '../interfaces/lista-ordem';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.page.html',
  styleUrls: ['./ordem.page.scss'],
})
export class OrdemPage implements OnInit {

  public ordens = [] as ListaOrdem[]
  private _localStorage: LocalStorageService<unknown>
  private _loading: HTMLIonLoadingElement
  private _toast: HTMLIonToastElement

  constructor(private router: Router,
    private ordemService: OrdemService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {

    this.ordens = [] as ListaOrdem[]
    this._localStorage = new LocalStorageService()
    this._loading = {} as HTMLIonLoadingElement
    this._toast = {} as HTMLIonToastElement

    if (!this._localStorage.exists('accesskey')) {
      this.router.navigate(['/'])
    }
  }

  async ngOnInit() { }

  async ionViewWillEnter() {
    this.ordens = await this.buscaLista() as ListaOrdem[]
  }

  public labelStatus(status: number): string {
    return listaStatusOrdem.get(status)?.label as string
  }

  public typeStatus(status: number): string {
    return listaStatusOrdem.get(status)?.type as string
  }

  private async buscaLista(): Promise<ListaOrdem[]> {

    await this.resolveLoading('Buscando Ordens...')

    this._loading.present()

    const { ordens } = await lastValueFrom(this.ordemService.list())

    this._loading.dismiss()

    return await ordens as ListaOrdem[]
  }

  public adicionarOrdem = () => {
    this.router.navigate(['/ordem/criar-ordem'])
  }

  public async onSearchChange(searchValue: string) {

    await this.resolveLoading('Buscando Ordens...')

    this._loading.present()

    const body = lastValueFrom(this.ordemService.list(searchValue))
    const { ordens } = await body

    this.ordens = ordens as ListaOrdem[]

    this._loading.dismiss()
  }

  public detalheOrdem(ordem: ListaOrdem): void {
    this.router.navigate(['/ordem/detalhe-ordem'], {
      state: {
        ordem
      }
    })
  }

  public async aprovar(ordemSelecionada: ListaOrdem): Promise<void> {
    await this.resolveLoading('Aprovando Ordem...')
    this._loading.present()
    const { ordens, success, message } = await firstValueFrom(this.ordemService.update(ordemSelecionada, 2))
    this._loading.dismiss()

    if (success) {
      this.ordens = ordens
      await this.resolveToast('Proposta aprovada com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }

  public async cancelar(ordemSelecionada: ListaOrdem): Promise<void> {
    await this.resolveLoading('Cancelando ordem...')
    this._loading.present()
    const { ordens, success, message } = await firstValueFrom(this.ordemService.update(ordemSelecionada, 4))
    this._loading.dismiss()

    if (success) {
      this.ordens = ordens
      await this.resolveToast('Ordem cancelada com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }
  public async finalizar(ordemSelecionada: ListaOrdem): Promise<void> {
    await this.resolveLoading('Finalizando ordem...')
    this._loading.present()
    const { ordens, success, message } = await firstValueFrom(this.ordemService.update(ordemSelecionada, 3))
    this._loading.dismiss()

    if (success) {
      this.ordens = ordens
      await this.resolveToast('Ordem finalizada com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }

  private resolveLoading = async (message: string): Promise<void> => {
    this._loading = await this.loadingCtrl.create({
      message
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
