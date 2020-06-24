import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router, Event, ActivatedRoute, NavigationEnd } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  category: string;
  products: Array<IProduct> = [];
  constructor(private prodService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute,
              private orderService: OrdersService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const nameOfCategory = this.activatedRoute.snapshot.paramMap.get('category');
        // this.getProducts(nameOfCategory);
      }
    });
  }

  ngOnInit(): void {
  }

  // private getProducts(categoryName: string = 'pizza'): void {
  //   this.prodService.getJSONCategoryProducts(categoryName).subscribe(
  //     data => {
  //       this.products = data;
  //       this.category = this.products[0].category.nameUA;
  //     }
  //   );
  // }

  public addBasket(product: IProduct): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      localProducts = JSON.parse(localStorage.getItem('products'));
      if (localProducts.some(prod => prod.id === product.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += product.count;
      } else {
        localProducts.push(product);
      }
    } else {
      localProducts.push(product);
    }
    localStorage.setItem('products', JSON.stringify(localProducts));
    product.count = 1;
    this.orderService.basket.next(localProducts);
  }

  public productCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    } else {
      if (product.count > 1) {
        product.count--;
      }
    }
  }

}
