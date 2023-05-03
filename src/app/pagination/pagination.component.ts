import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
  Say {{ message}}
`,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() totalPages = '';
  
  page:any = this.totalPages;
  
  constructor() { }

  ngOnInit(): void {
    console.log("Child Component " + this.totalPages);
  }

  pageChang(id:Number){
    console.log("chang page=" + id);
  }
  counter(i: number) {
    return new Array(i);
  }

}
