import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/service/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrls: ['./staff-register.component.scss']
})
export class StaffRegisterComponent implements OnInit {

  emailUnique = true;
  registrationUnique = true;
  staffForm!: FormGroup;
  submitted = false;
  disabled = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private staffService: StaffService
  ) {
    this.staffForm = this.formBuilder.group({
      registrationNumber: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      mobileNumber: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      alternateNumber: [null, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      gender: ['Male', Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      block: [null, Validators.required],
      district: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      localStorage.clear();
      localStorage.setItem('return-url', 'register-staff')
      this.router.navigate(['auth/login']);
    }
  }
  get staffFormError(): any {
    return this.staffForm.controls;
  }
  email(){
    this.emailUnique = true;
  }
  registration(){
    this.registrationUnique = true;
  }
  staff() {
    this.submitted = true;
    if (this.staffForm.invalid) {
      return;
    } else {
      this.disabled = true;
      this.staffService.createStaff(this.staffForm.value).subscribe(res => {
        this.submitted = false;
        this.disabled = false;
        this.staffForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Staff Created Successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(s => {
          this.router.navigate(['staff-list'])
        })
      }, (error) => {
        this.disabled = false;
        if (error.status === 409) {
          if (error.error.key == 'email') {
            this.emailUnique = false;
          } else if (error.error.key == 'registrationNumber') {
            this.registrationUnique = false;
          }
        }
        else if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Session Expired !',
          }).then(el => {
            localStorage.clear();
            localStorage.setItem('return-url', 'register-staff')
            this.router.navigate(['auth/login']);
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Went Wrong Try Again !',
          })
        }
      })
    }
  }
}
