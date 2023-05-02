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

  @Input() limit:Number = 0;
  constructor() { }

  ngOnInit(): void {
    console.log("Child Component " + this.limit);
  }

  counter(i: number) {
    return new Array(i);
  }

}
