import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormUnidade } from 'src/app/interfaces/form-unidade';
import { UnidadeService } from 'src/app/services/unidade.service';
import { CepPipe } from 'src/app/shared/cep-pipe/cep.pipe';
import { CnpjPipe } from 'src/app/shared/cnpj-pipe/cnpj.pipe';
import { CpfPipe } from 'src/app/shared/cpf-pipe/cpf.pipe';
import { PhonePipe } from 'src/app/shared/phone-pipe/phone.pipe';
import { RgPipe } from 'src/app/shared/rg-pipe/rg.pipe';

@Component({
  selector: 'app-adicionar-unidade',
  templateUrl: './adicionar-unidade.page.html',
  styleUrls: ['./adicionar-unidade.page.scss'],
})

export class AdicionarUnidadePage implements OnInit {

  public unidadeForm: FormGroup

  private pipePhone = new PhonePipe()
  private pipeCnpj = new CnpjPipe()
  private pipeCpf = new CpfPipe()
  private pipeCep = new CepPipe()
  private pipeRg = new RgPipe()
  public isToastOpen = false;
  public messageToast = ''
  public success = 'success'

  constructor(private fb: FormBuilder,
    private router: Router,
    private unidadeService: UnidadeService) {
    this.unidadeForm = this.fb.group({
      cnpj: new FormControl('', { validators: Validators.required }),
      razaoSocial: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      nomeFantasia: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      representante: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      rg: new FormControl('', { validators: Validators.required }),
      cpf: new FormControl('', { validators: Validators.required }),
      rua: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      numero: new FormControl('', { validators: [Validators.required, Validators.pattern("^[0-9]*$")] }),
      complemento: new FormControl(''),
      pais: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      estado: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      cidade: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      cep: new FormControl('', { validators: Validators.required }),
      bairro: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      telefone: new FormControl('', { validators: Validators.required }),
      celular: new FormControl(''),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    })
  }
  ngOnInit() {

    this.unidadeForm.get("cnpj")?.valueChanges.subscribe((selectedValue: string) => {
      this.unidadeForm.get("cnpj")?.setValue(this.pipeCnpj.transform(selectedValue), { emitEvent: false })
    })
    this.unidadeForm.get("cpf")?.valueChanges.subscribe((selectedValue: string) => {
      this.unidadeForm.get("cpf")?.setValue(this.pipeCpf.transform(selectedValue), { emitEvent: false })
    })
    this.unidadeForm.get("rg")?.valueChanges.subscribe((selectedValue: string) => {
      this.unidadeForm.get("rg")?.setValue(this.pipeRg.transform(selectedValue), { emitEvent: false })
    })
    this.unidadeForm.get("cep")?.valueChanges.subscribe((selectedValue: string) => {
      this.unidadeForm.get("cep")?.setValue(this.pipeCep.transform(selectedValue), { emitEvent: false })
    })
    this.unidadeForm.get("telefone")?.valueChanges.subscribe((selectedValue: string) => {
      this.unidadeForm.get("telefone")?.setValue(this.pipePhone.transform(selectedValue), { emitEvent: false })
    })
    this.unidadeForm.get("celular")?.valueChanges.subscribe((selectedValue: string) => {
      this.unidadeForm.get("celular")?.setValue(this.pipePhone.transform(selectedValue), { emitEvent: false })
    })
    this.unidadeForm.get("estado")?.valueChanges.subscribe((selectedValue: string) => {
      this.unidadeForm.get("estado")?.setValue(selectedValue.toUpperCase(), { emitEvent: false })
    })
  }

  public onSubmit = async () => {
    if (this.unidadeForm.valid) {
      const formValues = this.unidadeForm.value as FormUnidade;
      const { message, success } = await firstValueFrom(this.unidadeService.create(formValues))

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
    this.router.navigate(['/unidade'])
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.unidadeForm.get(field);
    return control && control.invalid && (control.dirty || control.touched) ? true : false;
  }


  public setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


}
