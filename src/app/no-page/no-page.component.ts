import { Component } from '@angular/core';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styleUrls: ['./no-page.component.css']
})
export class NoPageComponent {
  toggleVal: boolean = false;
 
  sidebarToggle(eventData: { toggleVal: boolean }) {
    this.toggleVal = eventData.toggleVal;
    console.log('dashborad page inside sidebar Toggle', eventData.toggleVal);
  }
}
