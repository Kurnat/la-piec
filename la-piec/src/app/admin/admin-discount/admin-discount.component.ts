import { Component, OnInit, TemplateRef } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { Discount } from 'src/app/shared/models/discount.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  arrayDiscounts: Array<any> = [];
  discountID: number;
  title: string;
  text: string;

  editStatus: boolean;

  modalRef: BsModalRef;

  constructor(private discountService: DiscountService, private modalService: BsModalService) { }

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

  public addDiscount(): void {
    const newD: IDiscount = new Discount(null, this.title, this.text);
    // if (this.arrayDiscounts.length > 0) {
    //   newD.id = this.arrayDiscounts.slice(-1)[0].id + 1;
    // }
    this.discountService.addJSONDiscounts(newD).subscribe(
      () => {
        this.getDiscounts();
      }
    );
    this.resetForm();
  }

  public deleteDiscount(discount: IDiscount): void {
    if (confirm('Yes or Not')) {
      this.discountService.deleteJSONDiscounts(discount).subscribe(
        () => {
          this.getDiscounts();
        }
      );
    }
  }

  public editDiscount(template: TemplateRef<any>, discount: IDiscount): void {
    this.modalRef = this.modalService.show(template);
    this.title = discount.title;
    this.text = discount.text;
    this.discountID = discount.id;
    this.editStatus = true;
  }

  public saveEditDiscount(): void{
    const editD: IDiscount = new Discount(this.discountID, this.title, this.text);
    this.discountService.updateJSONDiscounts(editD).subscribe(
      () => {
        this.getDiscounts();
      }
    );
    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.text = '';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editStatus = false;
    this.resetForm();
  }

}
