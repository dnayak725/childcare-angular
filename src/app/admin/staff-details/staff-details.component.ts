import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/service/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent implements OnInit {
  editButton = true;
  emailUnique = true;
  registrationUnique = true;
  staffForm!: FormGroup;
  submitted = false;
  disabled = true;
  staffSingle: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private staffService: StaffService
  ) {
    this.staffForm = this.formBuilder.group({
      id: [null, Validators.required],
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
    } else {
      if (this.staffService.staffSingle) {
        this.staffSingle = this.staffService.staffSingle;
        this.staffForm.patchValue({
          id: this.staffSingle.id,
          registrationNumber: this.staffSingle.registration_number,
          firstName: this.staffSingle.user.first_name,
          lastName: this.staffSingle.user.last_name,
          email: this.staffSingle.user.email,
          mobileNumber: this.staffSingle.phone,
          alternateNumber: this.staffSingle.alternate_phone,
          gender: this.staffSingle.gender,
          password: this.staffSingle.password,
          block: this.staffSingle.block,
          district: this.staffSingle.district,
        })
      } else {
        this.router.navigate(['staff-list']);
      }
    }
  }
  get staffFormError(): any {
    return this.staffForm.controls;
  }
  email() {
    this.emailUnique = true;
  }
  registration() {
    this.registrationUnique = true;
  }
  staff() {
    this.submitted = true;
    if (this.staffForm.invalid) {
      return;
    } else {
      this.disabled = true;
      this.staffService.updateStaff(this.staffForm.value).subscribe(res => {
        this.submitted = false;
        this.editButton = !this.editButton;
        Swal.fire({
          icon: 'success',
          title: 'Staff Updated Successfully',
          showConfirmButton: false,
          timer: 1500
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

  edit() {
    this.editButton = !this.editButton;
    if (!this.editButton) {
      this.disabled = false;
    }
  }
}
