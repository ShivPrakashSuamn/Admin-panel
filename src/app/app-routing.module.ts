import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersCreateComponent } from './users/users-create/users-create.component';
import { UsersImportComponent } from './users/users-import/users-import.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { TemplateCreateComponent } from './template/template-create/template-create.component';
import { PlansListComponent } from './plans/plans-list/plans-list.component';
import { PlansCreateComponent } from './plans/plans-create/plans-create.component';

const routes: Routes = [
  {path: 'sidebar', component: SidebarComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: UsersListComponent},
    {path: 'users/create', component: UsersCreateComponent},
    {path: 'users/update/:id', component: UsersCreateComponent},
    {path: 'users/import', component: UsersImportComponent},
  {path: 'template', component: TemplateListComponent},
    {path: 'template/create', component: TemplateCreateComponent},
    {path: 'template/update/:id', component: TemplateCreateComponent},
  {path: 'plans', component: PlansListComponent},
    {path: 'plans/create', component: PlansCreateComponent},
    {path: 'plans/update/:id', component: PlansCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
