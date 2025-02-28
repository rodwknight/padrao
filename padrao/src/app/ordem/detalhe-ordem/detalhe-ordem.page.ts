import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { listaStatusOrdem } from 'src/app/enums/status-ordem';
import { DetalheOrdem } from 'src/app/interfaces/detalhe-ordem';
import { OrdemService } from 'src/app/services/ordem.service';

@Component({
  selector: 'app-detalhe-ordem',
  templateUrl: './detalhe-ordem.page.html',
  styleUrls: ['./detalhe-ordem.page.scss'],
})
export class DetalheOrdemPage implements OnInit {

  public ordem: DetalheOrdem
  private _ordem: DetalheOrdem
  private _loading: HTMLIonLoadingElement
  private _toast: HTMLIonToastElement

  constructor(private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private ordemService: OrdemService) {
    const navigate = this.router.getCurrentNavigation()

    this.ordem = {} as DetalheOrdem
    this._ordem = navigate?.extras.state?.['ordem'] as DetalheOrdem
    this._loading = {} as HTMLIonLoadingElement
    this._toast = {} as HTMLIonToastElement
  }

  async ngOnInit() {
    await this.resolveLoading()
    this.ordem = await this.buscaDetalheOrdem()
  }

  public labelStatus(status: number): string {
    return listaStatusOrdem.get(status)?.label as string
  }

  public typeStatus(status: number): string {
    return listaStatusOrdem.get(status)?.type as string
  }

  public async iniciar() {
    await this.resolveLoading()
    this._loading.present()
    const { ordens: [ordens], success, message } = await firstValueFrom(this.ordemService.update(this.ordem, 2))
    this._loading.dismiss()

    if (success) {
      this.ordem = {
        ...this.ordem,
        status: ordens.status
      }
      await this.resolveToast('Ordem iniciada com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'success')
      await this._toast.present()
    }
  }

  public async cancelar() {
    await this.resolveLoading()
    this._loading.present()
    const { ordens: [ordens], success, message } = await firstValueFrom(this.ordemService.update(this.ordem, 3))
    this._loading.dismiss()

    if (success) {
      this.ordem = {
        ...this.ordem,
        status: ordens.status
      }
      await this.resolveToast('Ordem cancelada com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }

  public async finalizar() {
    await this.resolveLoading()
    this._loading.present()
    const { ordens: [ordens], success, message } = await firstValueFrom(this.ordemService.update(this.ordem, 3))
    this._loading.dismiss()

    if (success) {
      this.ordem = {
        ...this.ordem,
        status: ordens.status
      }
      await this.resolveToast('Ordem finalizada com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'tertiary')
      await this._toast.present()
    }
  }

  public validaContrato(): string | boolean {
    
    const contratos = this.ordem.contratos?.length ? this.ordem.contratos : undefined
    if (contratos) {
      return contratos[0].codContrato
    }

    return false
  }

  private async buscaDetalheOrdem(): Promise<DetalheOrdem> {

    this._loading.present()

    const { ordem } = await firstValueFrom(this.ordemService.detalhe(this._ordem.id))

    this._loading.dismiss()

    return ordem
  }

  private resolveLoading = async () => {
    this._loading = await this.loadingCtrl.create({
      message: 'Buscando ordens...'
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
