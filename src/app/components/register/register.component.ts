import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService) { 
    //this.authService.SignUp("najla","0000")
  }
    
  ngOnInit(): void {
  }

/*  onSubmit(formData:any) {
    if (formData.valid) {
      console.log(formData.value);
      this.authService.SignUp(
        formData.value.email,
        formData.value.password
      );
    }
  }*/

}
