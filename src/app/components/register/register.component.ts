import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth-services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Roles: any = ['Admin', 'Author', 'Reader'];
  constructor() { }
  email: string;
 password: string;
  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
    }
    
    signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
    }
    
    signOut() {
    this.authenticationService.SignOut();
    }
  ngOnInit(): void {
  }

}
