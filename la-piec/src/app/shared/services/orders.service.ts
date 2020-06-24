import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  basket: Subject<any> = new Subject<any>();
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/orders';
  }

  getJSONOrder(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.url);
  }

  addJSONOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.url, order);
  }
}
