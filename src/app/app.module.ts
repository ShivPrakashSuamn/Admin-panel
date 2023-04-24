import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlansListComponent } from './plans/plans-list/plans-list.component';
import { PlansCreateComponent } from './plans/plans-create/plans-create.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { TemplateCreateComponent } from './template/template-create/template-create.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersCreateComponent } from './users/users-create/users-create.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentUpdateComponent } from './payment/payment-update/payment-update.component';
import { SettingsListComponent } from './settings/settings-list/settings-list.component';
import { SettingsUpdateComponent } from './settings/settings-update/settings-update.component';
import { NoPageComponent } from './no-page/no-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    PlansListComponent,
    PlansCreateComponent,
    TemplateListComponent,
    TemplateCreateComponent,
    UsersListComponent,
    UsersCreateComponent,
    PaymentListComponent,
    PaymentUpdateComponent,
    SettingsListComponent,
    SettingsUpdateComponent,
    NoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatBadgeModule,
    MatButtonModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
