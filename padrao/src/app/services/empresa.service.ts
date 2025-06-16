import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Configuracao } from '../interfaces/configuracao';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private _localStorage: LocalStorageService<unknown>
  private _URL: string

  constructor(private http: HttpClient,
    private router: Router
  ) {
    this._localStorage = new LocalStorageService()
    this._URL = ''
    this.getUrl()
  }

  get list() {
    return this.http.get(`${this._URL}/empresa`)
  }

  private getUrl = (): void => {
    if (this._localStorage.exists('config')) {
      const { url } = this._localStorage.getItem('config') as Configuracao
      this._URL = `${url}/api`
    } else {
      this.router.navigate(['/'])
    }
  }
}
