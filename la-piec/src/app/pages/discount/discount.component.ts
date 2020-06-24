import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  arrayDiscounts: Array<IDiscount> = [];
  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.getDiscounts();
  }

  private getDiscounts(): void {
    this.discountService.getJSONDiscounts().subscribe(
      data => {
        this.arrayDiscounts = data;
      },
      error => { console.log('Discount service', error); }
    );
  }

}
