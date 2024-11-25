import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UnidadeService } from 'src/app/services/unidade.service';
import { FormUnidade } from 'src/app/interfaces/form-unidade'
import { SelectCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-criar-orcamento',
  templateUrl: './criar-orcamento.page.html',
  styleUrls: ['./criar-orcamento.page.scss'],
})
export class CriarOrcamentoPage implements OnInit {
  public orcamentoForm: FormGroup
  public isToastOpen = false;
  public messageToast = ''
  public success = 'success'
  public unidades:FormUnidade[] = []
  public unidadeSelecionada:FormUnidade = {} as FormUnidade

  constructor(private fb: FormBuilder,
      private router: Router,
      private unidadeService: UnidadeService
  ) {
    this.orcamentoForm = this.fb.group({
      unidade: [{}, Validators.required],
    })
  }

  ngOnInit() {
    this.cargaInicial()
  }

  private  cargaInicial = async () => {

    const { unidades } = await firstValueFrom(this.unidadeService.list())
    this.unidades = unidades
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

  public alterarUnidade(e:SelectCustomEvent){
    this.unidadeSelecionada = e.detail.value
  }
  

}
