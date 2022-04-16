import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/service/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  loader = true;
  staffList: any
  perPage = 5;
  pageNo = 1;
  paginationObj: any;
  totalCount: any;
  currentPage: any;
  totalPages: any;

  constructor(
    private staffService: StaffService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.staffService.staffList().subscribe(res => {
      this.staffList = res.body;
    }, (error) => {
      if (error.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Session Expired !',
        }).then(el => {
          localStorage.clear();
          localStorage.setItem('return-url', 'course')
          this.router.navigate(['auth/login']);
        })
      }
    })
  }
  pagination(page: any) {
    this.pageNo = page;

    this.loader = true;
    this.staffService.staff(this.perPage, this.pageNo).subscribe(res => {
      this.staffList = res.body;
      this.paginationObj = this.staffList['pagination'];
      this.staffList = this.staffList['dataset'];
      this.totalCount = this.paginationObj.total_count;
      this.currentPage = this.paginationObj.current_page;
      this.totalPages = this.paginationObj.total_pages;
      this.loader = false;
    }, (error: any) => {
      if (error.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Session Expired !',
        }).then(el => {
          localStorage.clear();
          localStorage.setItem('return-url', 'course')
          this.router.navigate(['auth/login']);
        })
      }
    })
  }
  editStaff(staff: any) {
    this.staffService.staffSingle = staff;
    this.router.navigate(['staff-details'])
  }

  deleteStaff(id: any) {
    this.staffService.deleteStaff({ "id": id }).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Staff Deleted Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.staffList = res.body;
    }, (error) => {
      if (error.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Session Expired !',
        }).then(el => {
          localStorage.clear();
          localStorage.setItem('return-url', 'course')
          this.router.navigate(['auth/login']);
        })
      }
    })
  }
}
