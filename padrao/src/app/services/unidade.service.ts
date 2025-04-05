import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Configuracao } from '../interfaces/configuracao';
import { FormUnidade } from '../interfaces/form-unidade';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  private localStorage = new LocalStorageService()
  private URL = '';

  constructor(private http: HttpClient,
    private router: Router
  ) {
    this.getUrl()
  }

  public create(dados: FormUnidade): Observable<any> {
    return this.http.post(`${this.URL}/unidade/create`, dados)
  }

  public list(filter:any = undefined): Observable<any> {
    return this.http.post(`${this.URL}/unidade/list`, {params : {filter}})    
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
