import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormServico } from 'src/app/interfaces/form-servico';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-criar-servico',
  templateUrl: './criar-servico.page.html',
  styleUrls: ['./criar-servico.page.scss'],
})
export class CriarServicoPage implements OnInit {

  public servicoForm: FormGroup
  public isToastOpen = false;
  public messageToast = ''
  public success = 'success'

  constructor(private fb: FormBuilder,
    private router: Router,
    private servicoService: ServicoService
  ) {
    this.servicoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      descricaoOrcamento: ['', Validators.required],
      valor: ['', { validators: [Validators.required, Validators.pattern("^[0-9]*$")] }],
    })
  }

  ngOnInit() { }


  public onSubmit = async () => {
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
      this.setOpen(true);

    }
  }

  public voltar = () => {
    this.router.navigate(['/servico'])
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.servicoForm.get(field);
    return control && control.invalid && (control.dirty || control.touched) ? true : false;
  }


  public setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


}
