import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = ''; // Variable to store error message


  constructor(private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar // Inject MatSnackBar service
    ){

  }

  username: string = '';
  password: string = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
    this.authenticationService.login(username, password).subscribe(
      {
        next: (res)=>{
          console.log(res);
          localStorage.setItem('token', res?.access);
        },
        error: (err)=>{
          console.log(err);
          if(err.status==401){
            this.errorMessage = 'Invalid username/password combination.'
          }
            this.snackBar.open(err.statusText, 'Close', {
              duration: 5000 // Set the duration for the snackbar
            });
          
        }
    }
    );
  }
}
}

