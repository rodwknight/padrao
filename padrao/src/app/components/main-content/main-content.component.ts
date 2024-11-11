import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {

  @Input() title = ''
  @Input() urlBack = ''
  @Input() search = false
  @Input('menu-id') menuId = 'home'
  @Output() searchChange = new EventEmitter<string>()

  private localStorage = new LocalStorageService()

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() { }

  public logout = (): void => {
    if (this.localStorage.exists('accesskey')) {
      this.authService.logout()
    }
    this.router.navigate(['/'])
  }

  public voltar = (url: string): void => {
    this.router.navigate([url])
  }

  public onSearchChange(event: SearchbarCustomEvent) {
    const searchValue = event.detail.value as string;
    this.searchChange.emit(searchValue);
  }

}
