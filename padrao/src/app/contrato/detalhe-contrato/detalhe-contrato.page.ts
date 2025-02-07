import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { listaStatusContrato } from 'src/app/enums/status-contrato';
import { DetalheContrato } from 'src/app/interfaces/detalhe-contrato';
import { ListaContrato } from 'src/app/interfaces/lista-contrato';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
  selector: 'app-detalhe-contrato',
  templateUrl: './detalhe-contrato.page.html',
  styleUrls: ['./detalhe-contrato.page.scss'],
})
export class DetalheContratoPage implements OnInit {

  public contrato: DetalheContrato
  private _contrato: ListaContrato
  private _loading: HTMLIonLoadingElement
  private _toast: HTMLIonToastElement

  constructor(private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private contratoService: ContratoService) {
    const navigate = this.router.getCurrentNavigation()

    this.contrato = {} as DetalheContrato
    this._contrato = navigate?.extras.state?.['contrato'] as ListaContrato
    this._loading = {} as HTMLIonLoadingElement
    this._toast = {} as HTMLIonToastElement
  }

  async ngOnInit() {
    await this.resolveLoading()
    this.contrato = await this.buscaDetalheContrato()
  }

  public labelStatus(status: number): string {
    return listaStatusContrato.get(status)?.label as string
  }

  public typeStatus(status: number): string {
    return listaStatusContrato.get(status)?.type as string
  }

  public async aprovarContrato() {
    await this.resolveLoading()
    this._loading.present()
    const { contratos: [contratos], success, message } = await firstValueFrom(this.contratoService.update(this.contrato))
    this._loading.dismiss()

    if (success) {
      this.contrato = {
        ...this.contrato,
        status: contratos.status
      }
      await this.resolveToast('Contrato aprovado com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }

  private async buscaDetalheContrato(): Promise<DetalheContrato> {

    this._loading.present()

    const { contrato } = await firstValueFrom(this.contratoService.detalhe(this._contrato.id))

    this._loading.dismiss()

    return contrato
  }

  private resolveLoading = async () => {
    this._loading = await this.loadingCtrl.create({
      message: 'Buscando contratos...'
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
