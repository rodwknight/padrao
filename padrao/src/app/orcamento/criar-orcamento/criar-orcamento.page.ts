import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UnidadeService } from 'src/app/services/unidade.service';
import { FormUnidade } from 'src/app/interfaces/form-unidade'
import { LoadingController, SelectCustomEvent } from '@ionic/angular';
import { FormCliente } from 'src/app/interfaces/form-clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormServico } from 'src/app/interfaces/form-servico';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-criar-orcamento',
  templateUrl: './criar-orcamento.page.html',
  styleUrls: ['./criar-orcamento.page.scss'],
})
export class CriarOrcamentoPage implements OnInit {
  public orcamentoForm: FormGroup
  public isToastOpen: boolean
  public messageToast: string
  public success: string
  public total: number
  public funcionarios: number
  public unidades: FormUnidade[]
  public clientes: FormCliente[]
  public servicos: FormServico[]
  public unidadeSelecionada: FormUnidade
  public clienteSelecionado: FormCliente
  public servicoSelecionado: FormServico
  public listaServicosAdicionados: FormServico[]
  private _loading: HTMLIonLoadingElement

  constructor(private fb: FormBuilder,
    private router: Router,
    private unidadeService: UnidadeService,
    private clienteService: ClienteService,
    private servicoService: ServicoService,
    private loadingCtrl: LoadingController
  ) {

    this.isToastOpen = false
    this.messageToast = ''
    this.success = 'success'
    this.total = 0
    this.funcionarios = 0
    this.unidades = [] as FormUnidade[]
    this.clientes = [] as FormCliente[]
    this.servicos = [] as FormServico[]
    this.unidadeSelecionada = {} as FormUnidade
    this.clienteSelecionado = {} as FormCliente
    this.servicoSelecionado = {} as FormServico
    this.listaServicosAdicionados = [] as FormServico[]
    this._loading = {} as HTMLIonLoadingElement
    this.orcamentoForm = this.fb.group({
      unidade: [this.unidadeSelecionada, Validators.required],
      cliente: [this.clienteSelecionado, Validators.required],
      servico: [this.servicoSelecionado, Validators.required],
      funcionarios: [this.funcionarios, Validators.required]
    })
  }

  async ngOnInit() {
    await this.resolveLoading()
    this.cargaInicial()
  }

  public onSubmit = () => { }

  public voltar = () => {
    this.router.navigate(['/orcamento'])
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.orcamentoForm.get(field);
    return control && control.invalid && (control.dirty || control.touched) ? true : false;
  }


  public setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  public alterarUnidade(e: SelectCustomEvent) {
    this.unidadeSelecionada = e.detail.value
  }

  public alterarCliente(e: SelectCustomEvent) {
    this.clienteSelecionado = e.detail.value

    const { funcionarios } = this.clienteSelecionado

    this.funcionarios = funcionarios

  }

  public alterarServico(e: SelectCustomEvent) {
    this.servicoSelecionado = e.detail.value
  }

  public adicionarServico(): void {
    if (this.servicoSelecionado.codServico) {
      if (!this.listaServicosAdicionados.find(servico => (servico.codServico === this.servicoSelecionado.codServico))) {
        this.listaServicosAdicionados = [...this.listaServicosAdicionados, this.servicoSelecionado]
      }

      this.somaTotal()
    }
  }

  public removeServico(servicoRemovido: FormServico): void {
    this.listaServicosAdicionados = this.listaServicosAdicionados.filter(servico => (servico.codServico != servicoRemovido.codServico))

    this.somaTotal()
  }

  private somaTotal(): void {
    this.total = 0

    for (let servico of this.listaServicosAdicionados) {
      this.total = this.total + parseFloat((servico.valor as string))
    }
  }


  private resolveLoading = async () => {
    this._loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    })
  }

  private cargaInicial = async () => {

    this._loading.present()

    const { unidades } = await firstValueFrom(this.unidadeService.list())
    const { clientes } = await firstValueFrom(this.clienteService.list())
    const { servicos } = await firstValueFrom(this.servicoService.list())

    this.unidades = unidades
    this.clientes = clientes
    this.servicos = servicos

    this._loading.dismiss()
  }

}
