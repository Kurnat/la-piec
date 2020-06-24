import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  // signIn(): void {
  //   this.auth.login().subscribe(
  //     data => {
  //       this.checkUser(data);
  //     }
  //   );
  // }

  // checkUser(users: any): void {
  //   const index = users.findIndex(user => user.login === this.login && user.password === this.password);
  //   if (index !== -1) {
  //     const user = users[index];
  //     localStorage.setItem('user', JSON.stringify(user));
  //     this.router.navigateByUrl('admin');
  //   } else {
  //     this.router.navigateByUrl('home');
  //   }
  // }

  signUp(): void {
    this.auth.signUp(this.login, this.password);
  }

  signIn(): void {
    this.auth.signIn(this.login, this.password);
  }

}
