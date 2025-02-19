import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Configuracao } from '../interfaces/configuracao';
import { Observable } from 'rxjs';
import { DetalheContrato } from '../interfaces/detalhe-contrato';
import { ListaContrato } from '../interfaces/lista-contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

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
      const { ip, protocolo, porta } = this._localStorage.getItem('config') as Configuracao
      this._URL = `${protocolo.value}://${ip}:${porta}/api`
    } else {
      this.router.navigate(['/'])
    }
  }

  public list(filter: any = undefined): Observable<any> {
    return this.http.post(`${this._URL}/contrato/list`, { params: { filter } })
  }

  public detalhe(id: string): Observable<any> {
    return this.http.post(`${this._URL}/contrato/detalhe`, { params: { id } })
  }

  public update(contrato: DetalheContrato | ListaContrato, status: number): Observable<any> {
    const body = {
      ...contrato,
      status
    }
    return this.http.patch(`${this._URL}/contrato/update`, body)
  }
}
