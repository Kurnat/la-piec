import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url: string;
  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.url = 'http://localhost:3000/products';
  }

  getJSONProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  addJSONProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, product);
  }

  deleteJSONProduct(product: IProduct): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${product.id}`);
  }

  updateJSONProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${product.id}`, product);
  }

  getJSONOneProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  getJSONCategoryProducts(categoryName: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${categoryName}`);
  }

  getFirebaseProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  addFirebaseProducts(product: any): Promise<DocumentReference>  {
    return this.firestore.collection('products').add({...product});
  }

  deleteFirebaseProducts(id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).delete();
  }

  updateFirebaseProducts(product: any, id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).update({...product});
  }
}
