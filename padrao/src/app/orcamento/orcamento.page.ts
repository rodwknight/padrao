import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.page.html',
  styleUrls: ['./orcamento.page.scss'],
})
export class OrcamentoPage implements OnInit {

  private localStorage = new LocalStorageService()
  public backPage = HomePage

  constructor(private authService: AuthService,
    private router: Router,) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit() { }

  public logout = (): void => {
    if (this.localStorage.exists('accesskey')) {
      this.authService.logout()
    }
    this.router.navigate(['/'])
  }

  public criarOrcamento = (): void => {
    this.router.navigate(['/orcamento/criar-orcamento'])
  }

}
