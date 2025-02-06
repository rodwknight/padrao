import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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

  constructor(private router: Router,
    private loadingCtrl: LoadingController,
    private contratoService: ContratoService) {
    const navigate = this.router.getCurrentNavigation()

    this.contrato = {} as DetalheContrato
    this._contrato = navigate?.extras.state?.['contrato'] as ListaContrato
    this._loading = {} as HTMLIonLoadingElement
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

  public aprovarContrato() {
    
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

}
