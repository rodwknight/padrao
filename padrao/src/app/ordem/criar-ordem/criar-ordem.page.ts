import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, SelectCustomEvent } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { FormCliente } from 'src/app/interfaces/form-clientes';
import { FormOrdem } from 'src/app/interfaces/form-ordem';
import { FormServico } from 'src/app/interfaces/form-servico';
import { FormUnidade } from 'src/app/interfaces/form-unidade';
import { UsuarioLogado } from 'src/app/interfaces/usuario-logado';
import { ClienteService } from 'src/app/services/cliente.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrdemService } from 'src/app/services/ordem.service';
import { ServicoService } from 'src/app/services/servico.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { ValorPipe } from 'src/app/shared/currency-pipe/currency-pipe.pipe';

@Component({
  selector: 'app-criar-ordem',
  templateUrl: './criar-ordem.page.html',
  styleUrls: ['./criar-ordem.page.scss'],
  providers: [ValorPipe]
})
export class CriarOrdemPage implements OnInit {

  public ordemForm: FormGroup
  public isToastOpen: boolean
  public messageToast: string
  public success: string
  public total: number
  public totalServicos: number
  public funcionarios: number
  public unidades: FormUnidade[]
  public clientes: FormCliente[]
  public servicos: FormServico[]
  public unidadeSelecionada: FormUnidade
  public clienteSelecionado: FormCliente
  public servicoSelecionado: FormServico
  public listaServicosAdicionados: FormServico[]
  private _loading: HTMLIonLoadingElement
  private _localStorage: LocalStorageService<unknown>

  constructor(private fb: FormBuilder,
    private router: Router,
    private unidadeService: UnidadeService,
    private clienteService: ClienteService,
    private servicoService: ServicoService,
    private ordemService: OrdemService,
    private loadingCtrl: LoadingController,
    private currencyPipe: ValorPipe) {
    this.isToastOpen = false
    this.messageToast = ''
    this.success = 'success'
    this.totalServicos = 0
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
    this._localStorage = new LocalStorageService()
    this.ordemForm = this.fb.group({
      unidade: ['', Validators.required],
      cliente: ['', Validators.required],
      servico: ['', Validators.required],
      funcionarios: [this.funcionarios, Validators.required],
      deslocamento: [false],
      valorDeslocamento: [{ value: '', disabled: true }]
    })
  }

  async ngOnInit() {
    await this.resolveLoading()
    this.cargaInicial()
    this.ordemForm.get("valorDeslocamento")?.valueChanges.subscribe((selectedValue: string) => {
      selectedValue = selectedValue.replace(',', '')
      this.ordemForm.get("valorDeslocamento")?.setValue(this.currencyPipe.transform(selectedValue), { emitEvent: false })
    })
  }

  public async onSubmit() {
    if (this.ordemForm.valid) {
      const formValues = this.ordemForm.value as FormOrdem;

      formValues.funcionarios = Number(formValues.funcionarios)

      const { cliente, unidade } = formValues
      const { usuarioId } = this._localStorage.getItem('usuario') as UsuarioLogado
      const valorDeslocamento = parseFloat((this.ordemForm.get('valorDeslocamento')?.value).replace('.', '').replace(',', '.'))
      const dados = {
        idCliente: cliente.id,
        idUnidade: unidade.id,
        idUsuario: usuarioId,
        funcionarios: this.funcionarios,
        deslocamento: this.ordemForm.get('deslocamento')?.value,
        valorDeslocamento,
        total: this.total,
        servicos: this.listaServicosAdicionados
      }

      const { message, success } = await firstValueFrom(this.ordemService.create(dados))

      this.messageToast = message

      if (success) {
        this.success = 'success'
        this.voltar()
      } else {
        this.success = 'danger'
      }
      this.setOpen(true);
    } else {
      this.ordemForm.markAllAsTouched();
      return;
    }

  }

  public voltar = () => {
    this.router.navigate(['/ordem'])
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.ordemForm.get(field);
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

  public alterarDeslocamento(e: CustomEvent) {

    const valorDeslocamento = this.ordemForm.get('valorDeslocamento');

    if (e.detail.checked) {
      valorDeslocamento?.enable();
      valorDeslocamento?.setValidators([Validators.required]);
    } else {
      valorDeslocamento?.disable();
      valorDeslocamento?.clearValidators();
    }

    valorDeslocamento?.updateValueAndValidity();
  }

  public alterarServico(e: SelectCustomEvent) {
    this.servicoSelecionado = e.detail.value
  }

  public adicionarServico(): void {
    if (this.servicoSelecionado.codServico) {
      if (!this.listaServicosAdicionados.find(servico => (servico.codServico === this.servicoSelecionado.codServico))) {
        this.listaServicosAdicionados = [...this.listaServicosAdicionados, this.servicoSelecionado]
      }

      this.somaTotalServicos()
    }
  }

  public removeServico(servicoRemovido: FormServico): void {
    this.listaServicosAdicionados = this.listaServicosAdicionados.filter(servico => (servico.codServico != servicoRemovido.codServico))

    this.somaTotalServicos()
  }

  public resolveValorTotal(): void {

    let valorDeslocamento: string = this.ordemForm.get('valorDeslocamento')?.value ? this.ordemForm.get('valorDeslocamento')?.value : '0'
    valorDeslocamento = (valorDeslocamento.replace('.', '')).replace(',', '.')

    let valorTotal = this.totalServicos + parseFloat(valorDeslocamento)

    this.total = parseFloat(valorTotal.toFixed(2))

  }

  private somaTotalServicos(): void {
    this.totalServicos = 0

    for (let servico of this.listaServicosAdicionados) {
      this.totalServicos = this.totalServicos + parseFloat((servico.valor as string))
    }

    this.resolveValorTotal()
  }


  public somaDeslocamento(e: CustomEvent) {
    this.resolveValorTotal()
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
