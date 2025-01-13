import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormServico } from 'src/app/interfaces/form-servico';
import { ServicoService } from 'src/app/services/servico.service';
import { ValorPipe } from 'src/app/shared/currency-pipe/currency-pipe.pipe';

@Component({
  selector: 'app-criar-servico',
  templateUrl: './criar-servico.page.html',
  styleUrls: ['./criar-servico.page.scss'],
  providers: [ValorPipe]
})
export class CriarServicoPage implements OnInit {

  public servicoForm: FormGroup
  public isToastOpen: boolean
  public messageToast: string
  public success: string

  constructor(private fb: FormBuilder,
    private router: Router,
    private servicoService: ServicoService,
    private currencyPipe: ValorPipe
  ) {
    this.isToastOpen = false
    this.messageToast = ''
    this.success = 'success'
    this.servicoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      descricaoProposta: ['', Validators.required],
      valor: ['', { validators: [Validators.required] }],
    })
  }

  ngOnInit() {
    this.servicoForm.get("valor")?.valueChanges.subscribe((selectedValue: string) => {
      selectedValue = selectedValue.replace(',', '')
      this.servicoForm.get("valor")?.setValue(this.currencyPipe.transform(selectedValue), { emitEvent: false })
    })
  }


  public async onSubmit() {
    if (this.servicoForm.valid) {
      const formValues = this.servicoForm.value as FormServico;
      const { message, success } = await firstValueFrom(this.servicoService.create(formValues))

      this.messageToast = message

      if (success) {
        this.success = 'success'
        this.voltar()
      } else {
        this.success = 'danger'
      }
      this.setOpen(true)

    }
  }

  public voltar(): void {
    this.router.navigate(['/servico'])
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.servicoForm.get(field)
    return control && control.invalid && (control.dirty || control.touched) ? true : false
  }


  public setOpen(isOpen: boolean): void {
    this.isToastOpen = isOpen
  }


}
