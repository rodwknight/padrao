import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Configuracao } from '../interfaces/configuracao';
import { Protocolo } from '../interfaces/protocolo';
import { Router } from '@angular/router';
import { IpPipe } from '../shared/ip-pipe/ip.pipe';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {

  public configuracaoForm: FormGroup
  public localStorageService = new LocalStorageService()
  public model = {} as Configuracao
  private pipeIp = new IpPipe()

  constructor(private fb: FormBuilder,
    private router: Router) {

    this.configuracaoForm = this.fb.group({
      ip: ['', Validators.required],
      porta: [4200, Validators.required],
      protocolo: [{
        id: 1,
        label: 'Https',
        value: 'https',
      }, Validators.required],
    })

  }

  public protocolos = [
    {
      id: 1,
      label: 'Https',
      value: 'https',
    },
    {
      id: 2,
      label: 'Http',
      value: 'http',
    },
  ] as Protocolo[];

  ngOnInit() {
    if (this.localStorageService.exists('config')) {
      this.model = this.localStorageService.getItem('config') as Configuracao
    }

    /*this.configuracaoForm.get("ip")?.valueChanges.subscribe((selectedValue:string) => {
      this.configuracaoForm.get("ip")?.setValue(this.pipeIp.transform(selectedValue), { emitEvent: false })
    })*/
  }

  public onSubmit = () => {
    this.localStorageService.setItem('config', { ip: this.model.ip, porta: this.model.porta, protocolo: this.model.protocolo })

    this.router.navigate(['/'])
  }

  public compareWith(o1: Protocolo, o2: Protocolo) {
    return o1.id === o2.id;
  }

}
