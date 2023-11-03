import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserEntity } from '../../model/user.entity';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signInForm: FormGroup
  hadError: boolean = false
  errorMessage: string = ""

  constructor(private builder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) {
    this.signInForm = this.builder.group({
      email: [],
      password: [],
      name: [],
      lastName: [],
      role: [],
      phone: [],
      pic: new FormControl("https://i.pinimg.com/736x/8d/ff/c8/8dffc810ac2226282085257e73a60761.jpg")
    })
  }

  get email() {
    return this.signInForm.controls['email']
  }

  get password() {
    return this.signInForm.controls['password']
  }

  get name() {
    return this.signInForm.controls['name']
  }

  get lastName() {
    return this.signInForm.controls['lastName']
  }

  get role() {
    return this.signInForm.controls['role']
  }

  get phone() {
    return this.signInForm.controls['phone']
  }

  get pic() {
    return this.signInForm.controls['pic']
  }

  ngOnInit(){
  }

  signUp() {
    if (this.signInForm.invalid) return

    const userEntity = this.signInForm.value as UserEntity

    this.authService.signUp(userEntity).subscribe({
      next: (response: any) => {
        localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
        localStorage.setItem('currentUser', JSON.stringify(response.user))
        this.signInForm.reset()
        this.router.navigate(['/order/all']).then()
      },
      error: (error: Error) => {
        this.hadError = true
        this.errorMessage = error.message
        scroll({
          top: 0
        })
      }
    })
  }

  cancelSignUp() {
    console.log('Cancelled')
  }
}
