import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormUnidade as FormCliente } from 'src/app/interfaces/form-unidade';
import { ClienteService } from 'src/app/services/cliente.service';
import { CepPipe } from 'src/app/shared/cep-pipe/cep.pipe';
import { CnpjPipe } from 'src/app/shared/cnpj-pipe/cnpj.pipe';
import { CpfPipe } from 'src/app/shared/cpf-pipe/cpf.pipe';
import { PhonePipe } from 'src/app/shared/phone-pipe/phone.pipe';
import { RgPipe } from 'src/app/shared/rg-pipe/rg.pipe';

@Component({
  selector: 'app-adicionar-cliente',
  templateUrl: './adicionar-cliente.page.html',
  styleUrls: ['./adicionar-cliente.page.scss'],
})
export class AdicionarClientePage implements OnInit {

  public clienteForm: FormGroup

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
    private clienteService: ClienteService) {
    this.clienteForm = this.fb.group({
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
    this.clienteForm.get("cnpj")?.valueChanges.subscribe((selectedValue: string) => {
      this.clienteForm.get("cnpj")?.setValue(this.pipeCnpj.transform(selectedValue), { emitEvent: false })
    })
    this.clienteForm.get("cpf")?.valueChanges.subscribe((selectedValue: string) => {
      this.clienteForm.get("cpf")?.setValue(this.pipeCpf.transform(selectedValue), { emitEvent: false })
    })
    this.clienteForm.get("rg")?.valueChanges.subscribe((selectedValue: string) => {
      this.clienteForm.get("rg")?.setValue(this.pipeRg.transform(selectedValue), { emitEvent: false })
    })
    this.clienteForm.get("cep")?.valueChanges.subscribe((selectedValue: string) => {
      this.clienteForm.get("cep")?.setValue(this.pipeCep.transform(selectedValue), { emitEvent: false })
    })
    this.clienteForm.get("telefone")?.valueChanges.subscribe((selectedValue: string) => {
      this.clienteForm.get("telefone")?.setValue(this.pipePhone.transform(selectedValue), { emitEvent: false })
    })
    this.clienteForm.get("celular")?.valueChanges.subscribe((selectedValue: string) => {
      this.clienteForm.get("celular")?.setValue(this.pipePhone.transform(selectedValue), { emitEvent: false })
    })
    this.clienteForm.get("estado")?.valueChanges.subscribe((selectedValue: string) => {
      this.clienteForm.get("estado")?.setValue(selectedValue.toUpperCase(), { emitEvent: false })
    })
  }

  public onSubmit = async () => {
    if (this.clienteForm.valid) {
      const formValues = this.clienteForm.value as FormCliente;
      const { message, success } = await firstValueFrom(this.clienteService.create(formValues))

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
    this.router.navigate(['/cliente'])
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.clienteForm.get(field);
    return control && control.invalid && (control.dirty || control.touched) ? true : false;
  }


  public setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

}
