
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  search: any;
  value: any;
  toggleVal: any = false;
  rootUrl: any;
  mail_opne: any;
  @Output() sidebarToggle = new EventEmitter<{ toggleVal: boolean }>(); // event emitter
  @Output() emailOpne = new EventEmitter<{ emailval: boolean }>(); // event emitter


  // ------------------    life cycle of angular    ----------------------- ||

  constructor(private router: Router) { }

  ngOnChanges() {
    // console.log('ngOnChange');
  }
  ngOnInit() {
    this.rootUrl = this.router.url;
    // console.log('ngOnInit');
  }
  ngDoCheck() {
    // console.log('ngDoCheck');
    // when any input change then it call
  }
  ngAfterContentInit() {
    // console.log('ngAfterContentInit')
  }
  ngAfterContentChecked() {
    // when any input change then it call
    // console.log('ngAfterContentChecked')
  }
  ngAfterViewInit() {
    // console.log('ngAfterViewInit');
  }
  ngAfterViewChecked() {
    // when any input change then it call
  }
  ngOnDestroy() {
    // console.log('ngOnDestroy')
    // component remove from dom then it method call
  }

  // -----------------     custome methods       ------------------------- ||

  envelopechang() {  //  Email one of  ---------
    if (this.mail_opne) {
      this.mail_opne = false;
    } else {
      this.mail_opne = true;
    }
    this.emailOpne.emit({ emailval: this.mail_opne });
  }

  toggleSidebar() {  //  sidebar manage --------
    if (this.toggleVal) {
      this.toggleVal = false;
    } else {
      this.toggleVal = true;
    }
    this.sidebarToggle.emit({ toggleVal: this.toggleVal }); // trow data to other component
  }
  
  light() {          //  White color design-----
    document.body.style.background = "white";
  }
  dark() {           //  Black color design-----
    document.body.style.background = "#060c21";
  }
  searchVal() {      //  Search function  ------
    console.log('this is search', this.search);
    this.value = this.search;
  }

  getActive(menu: string) {  // Active list-----
    if (this.rootUrl.includes(menu)) {
      return true;
    } else {
      return false;
    }
  }

  logout(){         //  Logout page  -----------
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
