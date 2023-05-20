import { Component } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  toggleVal: boolean = false;
  totalUser:Number = 0;
  totalPlan:Number = 0;
  totalPayment:Number = 0;
  totalTemplate:Number = 0;

  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService: ApiService, private alertService:AlertService) { }

  ngOnInit() {
    this.getdata();
  }

  // ---------------------      custome methods      -----------------------  ||

  getdata() {
    let url: string = '/dashboard';
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url, headers).subscribe((data: any) => {
      if(data.status){
      this.totalUser = data.data.totalUsers;
      this.totalPlan = data.data.totalPlans;
      this.totalPayment = data.data.totalPayments;
      this.totalTemplate = data.data.totalTemplates; 
      } else {
        this.alertService.warning(data.message);
      }
    });
  }

  sidebarToggle(eventData: { toggleVal: boolean }) {
    this.toggleVal = eventData.toggleVal;
    console.log('dashborad page inside sidebar Toggle', eventData.toggleVal);
  }
}
