import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { FormServico } from '../interfaces/form-servico';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
})
export class ServicoPage implements OnInit {

  public servicos = [] as FormServico[]

  constructor(private router: Router,
    private servicoService: ServicoService,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    this.servicos = await this.buscaLista() as FormServico[]
  }

  private async buscaLista(): Promise<FormServico[]> {

    const loading = await this.loadingCtrl.create({
      message: 'Buscando serviços...'
    });

    loading.present()

    const { servicos } = await lastValueFrom(this.servicoService.list())

    loading.dismiss()

    return await servicos as FormServico[]
  }

  public adicionarServico = () => {
    this.router.navigate(['/servico/criar-servico'])
  }

  public async onSearchChange(searchValue: string) {

    const loading = await this.loadingCtrl.create({
      message: 'Buscando serviços...'
    });

    loading.present()

    const body = lastValueFrom(this.servicoService.list(searchValue))
    const { servicos } = await body

    this.servicos = servicos as FormServico[]

    loading.dismiss()
  }
}
