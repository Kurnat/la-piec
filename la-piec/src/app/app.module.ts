import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountDetailsComponent } from './pages/discount-details/discount-details.component';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { SaladComponent } from './pages/salad/salad.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { HryvniaPipe } from './shared/pipes/hryvnia.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

// NgxUiLoader
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './ngxUiLoaderConfig';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

export const firebaseConfig =  {
    apiKey: 'AIzaSyBPo3SmI_BbVOL5sV130FTxnF9Vdem76sI',
    authDomain: 'trainee-48a9d.firebaseapp.com',
    databaseURL: 'https://trainee-48a9d.firebaseio.com',
    projectId: 'trainee-48a9d',
    storageBucket: 'trainee-48a9d.appspot.com',
    messagingSenderId: '1062250233035',
    appId: '1:1062250233035:web:4e1979f789c339b58a2f4e'
  }


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscountComponent,
    DiscountDetailsComponent,
    PizzaComponent,
    SaladComponent,
    DrinksComponent,
    PaymentComponent,
    BasketComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminDiscountComponent,
    AdminOrdersComponent,
    HryvniaPipe,
    SearchPipe,
    ProductComponent,
    ProductDetailsComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
