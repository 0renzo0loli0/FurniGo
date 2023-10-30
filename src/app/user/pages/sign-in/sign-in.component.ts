import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm: FormGroup
  hadError: boolean = false
  errorMessage: string = ''

  constructor(private builder: FormBuilder, 
              private authService: AuthenticationService,
              private router: Router) { 
                this.signInForm = this.builder.group({
                  email:     [],
                  password: []
                })
                if(AuthUtils.existUser() && AuthUtils.existToken()) {
                  router.navigate(["/"])
                }
              }

  get email(){
    return this.signInForm.controls['email']
  }

  get password(){
    return this.signInForm.controls['password']
  }

  signIn(){
    if(this.signInForm.invalid) return

    const userEntity = this.signInForm.value
    this.authService.signIn(userEntity).subscribe((response: any)=>{
      localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      this.signInForm.reset()
      this.router.navigate(['/order/all']).then()
    })

    this.authService.signIn(userEntity).subscribe({
      next: (response: any)=>{
      localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      this.signInForm.reset()
      this.router.navigate(['/order/all']).then()
      },
      error: (error: Error)=> {
        this.hadError = true
        this.errorMessage = error.message
        scroll({
          top: 0
        })
      }
    })
  }

  cancelSignUp(){
    console.log('Cancelled')
  }
}
