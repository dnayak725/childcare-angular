import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildrenService } from 'src/app/service/children.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {
  childrenList: any
  constructor(
    private childrenService: ChildrenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.childrenService.childrenList().subscribe(res => {
      this.childrenList = res.body;
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
