import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderConfig, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

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
import { PaginationComponent } from './pagination/pagination.component';
import { EditorComponent } from './editor/editor.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsOpacity: 0.5,
  bgsSize: 60,
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: 'red',
  fgsSize: 60,
  gap: 24,
  logoSize: 120,
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: 'red',
  pbThickness: 5,
  hasProgressBar: false,
  text: 'Welcome to Editor',
  textColor: '#FFFFFF',
  maxTime: -1,
  minTime: 500
};

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
    NoPageComponent,
    PaginationComponent,
    EditorComponent
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

    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    NgxUiLoaderHttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
