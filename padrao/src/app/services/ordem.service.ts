import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Configuracao } from '../interfaces/configuracao';
import { Observable } from 'rxjs';
import { FormOrdem } from '../interfaces/form-ordem';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {

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
  
    public create(dados: FormOrdem): Observable<any> {
  
      return this.http.post(`${this._URL}/ordem/create`, dados)
    }
  
    public list(filter: any = undefined): Observable<any> {
      return this.http.post(`${this._URL}/ordem/list`, { params: { filter } })
    }
  
    public detalhe(id: string): Observable<any> {
      return this.http.post(`${this._URL}/ordem/detalhe`, { params: { id } })
    }
  
    public update(ordem: Partial<FormOrdem>, status: number): Observable<any> {
      const body = {
        ...ordem,
        status
      }
      return this.http.patch(`${this._URL}/ordem/update`, body)
    }
}
