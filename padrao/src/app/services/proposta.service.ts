import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Configuracao } from '../interfaces/configuracao';
import { FormProposta } from '../interfaces/form-proposta';
import { Observable } from 'rxjs';
import { ListaProposta } from '../interfaces/lista-proposta';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  private _localStorage: LocalStorageService<unknown>
  private _URL: string

  constructor(private http: HttpClient,
    private router: Router) {
    this._localStorage = new LocalStorageService()
    this._URL = ''
    this.getUrl()
  }

  private getUrl = (): void => {
    if (this._localStorage.exists('config')) {
      const { url } = this._localStorage.getItem('config') as Configuracao
      this._URL = `${url}/api`
    } else {
      this.router.navigate(['/'])
    }
  }

  public create(dados: FormProposta): Observable<any> {

    return this.http.post(`${this._URL}/proposta/create`, dados)
  }

  public list(filter: any = undefined): Observable<any> {
    return this.http.post(`${this._URL}/proposta/list`, { params: { filter } })
  }

  public detalhe(id: string): Observable<any> {
    return this.http.post(`${this._URL}/proposta/detalhe`, { params: { id } })
  }

  public update(proposta: ListaProposta, status: number): Observable<any> {
    const body = {
      ...proposta,
      status
    }
    return this.http.patch(`${this._URL}/proposta/update`, body)
  }
}
