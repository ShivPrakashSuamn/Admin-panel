import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() totalPage = '';
  @Input() page = ''; 
  @Output() newPage = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    console.log("Child Component " + this.totalPage);
  }

  pageChang(id:any){
    this.page = id;
    this.newPage.emit(id);
  }
  counter(i: any) {
    return new Array(i);
  }

}
