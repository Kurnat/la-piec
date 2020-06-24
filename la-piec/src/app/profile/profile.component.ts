import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string;
  userEmail: string;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }


  logOut(): void {
    this.auth.signOut();
  }

  check(data){
    console.log(data);
  }

  submit(form: NgForm){
    // console.log(form.value.userName, form.value.userEmail)
    console.log(form.value)
  }

}
