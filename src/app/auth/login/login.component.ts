import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  disabled = false;
  url: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/'])
    }
  }
  get loginError(): any {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.disabled = true
      this.authService.login(this.loginForm.value).subscribe((res:any) => {
        localStorage.setItem('token', res['tokenAuthentication']);
        localStorage.setItem('username', res['user'][0]['first_name'] + res['user'][0]['last_name']);
        // If return url exist
        if (localStorage.getItem('return-url')) {
          this.url = localStorage.getItem('return-url');
          // If return url admin && login user admin then it return to return url
          if (this.url.includes('admin') && res['user'][0]['is_superuser'] == true) {
            this.router.navigate([localStorage.getItem('return-url')]).then(res => {
              localStorage.removeItem('return-url');
            })
            // If return url user && login user is user then it return to return url
          } else if (!this.url.includes('admin') && res['user'][0]['is_superuser'] == false) {
            this.router.navigate([localStorage.getItem('return-url')]).then(res => {
              localStorage.removeItem('return-url');
            })
          } else {
            // Return url and login user missmatch it will return normal page
            localStorage.removeItem('return-url');
            this.router.navigate(['/']);
            // if (res['user'][0]['is_superuser'] == true) {
            //   localStorage.setItem('admin', res['user'][0]['is_superuser']);
            //   this.router.navigate(['/admin']);
            // } else {
            //   this.router.navigate(['/']);

            // }
          }
          // If return url doesn't exist
        } else if (res['user'][0]['is_superuser'] == true) {
          localStorage.setItem('admin', res['user'][0]['is_superuser']);
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }

      }, (error) => {
        this.disabled = false
        if (error.status == 403 || error.status == 404) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username or Passwoord Incorrect !',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong please try again !',
          })
        }
      })
    }
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
