import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string;
  userStatusChanges: Subject<any> = new Subject<any>();
  currentUser: any;
  checkUserLogin: boolean;
  checkAdminLogin: boolean;
  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.url = 'http://localhost:3000/users';
  }

  login(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          id: userResponse.user.uid,
          username: userResponse.user.email,
          role: 'user'
        };
        this.firestore.collection('users').add(user)
          .then(data => {
            data.get().then(x => {
              console.log(x.data());
            });
          })
          .catch(err => console.log('get data firestore collection', err));
      })
      .catch(err => console.log('create user', err));
  }

  signIn(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        this.firestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          users => {
            users.forEach(userRef => {
              this.currentUser = userRef.data();
              localStorage.setItem('user', JSON.stringify(this.currentUser));
              if (this.currentUser.role !== 'admin') {
                this.checkUserLogin = true;
                this.userStatusChanges.next('user');
                this.router.navigateByUrl('profile');
              }
              else {
                this.checkAdminLogin = true;
                this.userStatusChanges.next('admin');
                this.router.navigateByUrl('admin');
              }
            });
          }
        );
      })
      .catch(err => console.log('user sign in ', err));
  }

  signOut() {
    this.afAuth.signOut()
      .then(() => {
        console.log('user signed out successfully');
        localStorage.removeItem('user');
        this.userStatusChanges.next('signOut');
        this.checkUserLogin = false;
        this.checkAdminLogin = false;
        this.router.navigateByUrl('home');
      })
      .catch(err => console.log('SignOut error', err));
  }
}

