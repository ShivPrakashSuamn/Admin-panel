import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersCreateComponent } from './users/users-create/users-create.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { TemplateCreateComponent } from './template/template-create/template-create.component';
import { PlansListComponent } from './plans/plans-list/plans-list.component';
import { PlansCreateComponent } from './plans/plans-create/plans-create.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentUpdateComponent } from './payment/payment-update/payment-update.component';
import { SettingsListComponent } from './settings/settings-list/settings-list.component';
import { SettingsUpdateComponent } from './settings/settings-update/settings-update.component';
import { NoPageComponent } from './no-page/no-page.component';
import { PaginationComponent } from './pagination/pagination.component';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { AuthGuard } from './_services/auth.guard';

const routes: Routes = [
  // { path: 'sidebar', component: SidebarComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'users/create', component: UsersCreateComponent, canActivate: [AuthGuard] },
  { path: 'users/update/:id', component: UsersCreateComponent, canActivate: [AuthGuard] },
  { path: 'template', component: TemplateListComponent, canActivate: [AuthGuard] },
  { path: 'template/create', component: TemplateCreateComponent, canActivate: [AuthGuard] },
  { path: 'template/update/:id', component: TemplateCreateComponent, canActivate: [AuthGuard] },
  { path: 'plans', component: PlansListComponent, canActivate: [AuthGuard] },
  { path: 'plans/create', component: PlansCreateComponent, canActivate: [AuthGuard] },
  { path: 'plans/update/:id', component: PlansCreateComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentListComponent, canActivate: [AuthGuard] },
  { path: 'payment/update/:id', component: PaymentUpdateComponent, canActivate: [AuthGuard] },
  { path: 'setting', component: SettingsListComponent, canActivate: [AuthGuard] },
  { path: 'setting/create', component: SettingsUpdateComponent, canActivate: [AuthGuard] },
  { path: 'setting/update/:id', component: SettingsUpdateComponent, canActivate: [AuthGuard] },
  { path: 'pagination', component: PaginationComponent, canActivate: [AuthGuard] },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
