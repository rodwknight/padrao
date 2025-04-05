import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormServico } from '../interfaces/form-servico';
import { Observable } from 'rxjs';
import { Configuracao } from '../interfaces/configuracao';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private localStorage:LocalStorageService<unknown>
  private URL:string

  constructor(private http: HttpClient,
    private router: Router
  ) {
    this.localStorage = new LocalStorageService()
    this.URL = ''
    this.getUrl()
  }

  public create(dados: FormServico): Observable<any> {
    let valor = (dados.valor as string).replace('.', '')
    dados.valor = parseFloat(valor.replace(',', '.'))
    return this.http.post(`${this.URL}/servico/create`, dados)
  }

  public list(filter: any = undefined): Observable<any> {
    return this.http.post(`${this.URL}/servico/list`, { params: { filter } })
  }

  private getUrl = (): void => {
    if (this.localStorage.exists('config')) {
      const { url } = this.localStorage.getItem('config') as Configuracao
      this.URL = `${url}/api`
    } else {
      this.router.navigate(['/'])
    }
  }
}
