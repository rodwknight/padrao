import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private localStorage = new LocalStorageService()

  constructor(private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    if (!this.localStorage.exists('accesskey')) {
      this.router.navigate(['/'])
    }
  }

  ionViewDidEnter() {
    this.menuCtrl.close('home');
  }

  ngOnInit() { }

  public logout = (): void => {
    if (this.localStorage.exists('accesskey')) {
      this.authService.logout()
    }
    this.router.navigate(['/'])
  }

  public irPara = (nav: string): void => {
    this.router.navigate([`/${nav}`])
  }

}
