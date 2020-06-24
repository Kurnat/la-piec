import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { ActivatedRoute } from '@angular/router';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {
  view: IDiscount = null;
  constructor(private discountService: DiscountService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOneDiscount();
  }

  private getOneDiscount(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.discountService.getJSONDiscountsDetails(id).subscribe(
      data => {
        this.view = data;
      }
    )
  }

}
