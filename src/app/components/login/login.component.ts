import { Component,EventEmitter, OnInit, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoginData } from '../../interfaces/LoginData';
import { AuthService } from '../../shared/services/auth-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(
    public authService: AuthService,
  ) {
    //this.authService.LogIn("najla","0000")

  }

  ngOnInit(): void {}
  /*onSubmit(formData:any) {
    if (formData.valid) {
      console.log(formData.value);
      this.authService.LogIn(
        formData.value.email,
        formData.value.password
      );
      this.router.navigate(['/home'])
    }
  }*/
}