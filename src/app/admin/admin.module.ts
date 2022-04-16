import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StaffRegisterComponent } from './staff-register/staff-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { ChildrenComponent } from './children/children.component';



@NgModule({
  declarations: [
    AdminHomeComponent,
    DashboardComponent,
    StaffRegisterComponent,
    StaffDetailsComponent,
    StaffListComponent,
    ChildrenComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
