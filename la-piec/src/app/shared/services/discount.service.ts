import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDiscount } from '../interfaces/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  // private discounts: Array<any> = [
  //   {
  //     id: 1,
  //     title: 'Приведи друга',
  //     text: 'Blablalba'
  //   },
  //   {
  //     id: 2,
  //     title: '4 піца в подарунок',
  //     text: 'Blablalba'
  //   }
  // ];

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/discounts';
  }

  // public getDiscounts(): Array<any> {
  //   return this.discounts;
  // }

  // public setDiscounts(discount): void {
  //   this.discounts.push(discount);
  // }

  getJSONDiscounts(): Observable<Array<IDiscount>> {
    return this.http.get<Array<IDiscount>>(this.url);
  }

  addJSONDiscounts(discount: IDiscount): Observable<IDiscount> {
    return this.http.post<IDiscount>(this.url, discount);
  }

  deleteJSONDiscounts(discount: IDiscount): Observable<IDiscount> {
    return this.http.delete<IDiscount>(`${this.url}/${discount.id}`);
  }

  updateJSONDiscounts(discount: IDiscount): Observable<IDiscount> {
    return this.http.put<IDiscount>(`${this.url}/${discount.id}`, discount);
  }

  getJSONDiscountsDetails(id: number): Observable<IDiscount> {
    return this.http.get<IDiscount>(`${this.url}/${id}`);
  }
}
