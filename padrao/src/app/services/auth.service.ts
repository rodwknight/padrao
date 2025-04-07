import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Configuracao } from '../interfaces/configuracao';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private localStorage = new LocalStorageService()
  private URL: string = ''

  constructor(private http: HttpClient,
    private router: Router) { }



  login(username: string, password: string, empresa: string): Observable<any> {
    this.getUrl()
    return this.http.post(`${this.URL}/login/get`, { username, password, empresa });
  }

  create(): Observable<any> {
    this.getUrl()
    return this.http.post(`${this.URL}/login/create`, {
      username: 'wid',
      password: '123',
      nome: 'rodrigo',
      empresaId: '1'
    })
  }

  logout() {
    this.localStorage.removeItem('accesskey')
  }

  private getUrl() {
    if (this.localStorage.exists('config')) {
      const { url } = this.localStorage.getItem('config') as Configuracao
      this.URL = `${url}/api`

    } else {
      this.router.navigate(['/'])
    }
  }
}
