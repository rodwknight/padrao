import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { listaStatusProposta } from 'src/app/enums/status-proposta';
import { DetalheProposta } from 'src/app/interfaces/detalhe-proposta';
import { ListaProposta } from 'src/app/interfaces/lista-proposta';
import { PropostaService } from 'src/app/services/proposta.service';

@Component({
  selector: 'app-detalhe-proposta',
  templateUrl: './detalhe-proposta.page.html',
  styleUrls: ['./detalhe-proposta.page.scss'],
})
export class DetalhePropostaPage implements OnInit {

  public proposta: DetalheProposta
  private _proposta: ListaProposta
  private _loading: HTMLIonLoadingElement
  private _toast: HTMLIonToastElement

  constructor(private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private propostaService: PropostaService) {
    const navigate = this.router.getCurrentNavigation()

    this.proposta = {} as DetalheProposta
    this._proposta = navigate?.extras.state?.['proposta'] as ListaProposta
    this._loading = {} as HTMLIonLoadingElement
    this._toast = {} as HTMLIonToastElement
  }

  async ngOnInit() {
    await this.resolveLoading()
    this.proposta = await this.buscaDetalheProposta()
  }

  public labelStatus(status: number): string {
    return listaStatusProposta.get(status)?.label as string
  }

  public typeStatus(status: number): string {
    return listaStatusProposta.get(status)?.type as string
  }

  public async aprovarProposta() {
    await this.resolveLoading()
    this._loading.present()
    const { propostas: [propostas], success, message } = await firstValueFrom(this.propostaService.update(this.proposta, 2))
    this._loading.dismiss()

    if (success) {
      this.proposta = {
        ...this.proposta,
        status: propostas.status
      }
      await this.resolveToast('Proposta aprovada com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }

  public async reprovarProposta() {
    await this.resolveLoading()
    this._loading.present()
    const { propostas: [propostas], success, message } = await firstValueFrom(this.propostaService.update(this.proposta, 3))
    this._loading.dismiss()

    if (success) {
      this.proposta = {
        ...this.proposta,
        status: propostas.status
      }

      await this.resolveToast('Proposta reprovada com sucesso!', 'success')
      await this._toast.present()
    } else {
      await this.resolveToast(message, 'danger')
      await this._toast.present()
    }
  }

  private async buscaDetalheProposta(): Promise<DetalheProposta> {

    this._loading.present()

    const { proposta } = await firstValueFrom(this.propostaService.detalhe(this._proposta.id))

    this._loading.dismiss()

    return await proposta as DetalheProposta
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
