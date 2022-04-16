import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ChildrenComponent } from './children/children.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffRegisterComponent } from './staff-register/staff-register.component';


const routes: Routes = [
    {
        path: '', component: AdminHomeComponent,
        children: [
            { path: '', pathMatch: 'full', component: DashboardComponent },
            { path: 'register-staff', pathMatch: 'full', component: StaffRegisterComponent },
            { path: 'staff-list', pathMatch: 'full', component: StaffListComponent },
            { path: 'staff-details', pathMatch: 'full', component: StaffDetailsComponent },
            { path: 'children', pathMatch: 'full', component: ChildrenComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
