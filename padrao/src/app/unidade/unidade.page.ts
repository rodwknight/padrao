import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadeService } from '../services/unidade.service';
import { lastValueFrom } from 'rxjs';
import { FormUnidade } from '../interfaces/form-unidade';
//import { listaStatusUnidade } from '../enums/status-unidade';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.page.html',
  styleUrls: ['./unidade.page.scss'],
})
export class UnidadePage implements OnInit {

  public unidades = [] as FormUnidade[]

  constructor(private router: Router,
    private unidadeService: UnidadeService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    this.unidades = await this.buscaLista() as FormUnidade[]
  }

  public adicionarUnidade = () => {
    this.router.navigate(['/unidade/adicionar-unidade'])
  }

  private async buscaLista(): Promise<FormUnidade[]> {

    const loading = await this.loadingCtrl.create({
      message: 'Buscando unidades...'
    });

    loading.present()

    const { unidades } = await lastValueFrom(this.unidadeService.list())

    loading.dismiss()

    return await unidades as FormUnidade[]
  }

  public async onSearchChange(searchValue: string) {

    const loading = await this.loadingCtrl.create({
      message: 'Buscando unidades...'
    });

    loading.present()

    const body = lastValueFrom(this.unidadeService.list(searchValue))
    const { unidades } = await body

    this.unidades = unidades as FormUnidade[]

    loading.dismiss()
  }

}
