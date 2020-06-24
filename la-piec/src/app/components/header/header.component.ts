import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  myBasket: Array<IProduct> = [];
  totalPrice = 0;
  statusLogin: boolean;
  urlLogin: string;
  pageLogin: string;
  constructor(private orderService: OrdersService, private auth: AuthService) { }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalStorage();
    this.checkUser();
    this.checkUserLocalStorage();
  }

  private checkBasket(): void {
    this.orderService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.myBasket = JSON.parse(localStorage.getItem('products'));
      this.totalPrice = this.myBasket.reduce((total, product) => total + (product.price * product.count), 0);
    }
  }

  private checkUser(): void {
    this.auth.userStatusChanges.subscribe(
      () => {
        this.checkUserLocalStorage();
      }
    );
  }

  private checkUserLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      if (user.role === 'admin') {
        this.urlLogin = 'admin';
        this.pageLogin = 'адмін';
      } else {
        this.urlLogin = 'profile';
        this.pageLogin = 'кабінет';
      }
      this.statusLogin = true;
    } else {
      this.statusLogin = false;
      this.urlLogin = '';
      this.pageLogin = '';
    }
  }
}

