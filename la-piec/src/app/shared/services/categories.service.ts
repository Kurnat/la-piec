import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url: string;
  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.url = 'http://localhost:3000/categories';
  }

  getJSONCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url);
  }

  addJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.url, category);
  }

  deleteJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.url}/${category.id}`);
  }

  updateJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.url}/${category.id}`, category);
  }

  getFirebaseCategories() {
    return this.firestore.collection('categories').snapshotChanges();
  }

}
