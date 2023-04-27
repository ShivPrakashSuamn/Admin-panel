import { Component } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AlertService } from '../../_services/alert.service';
import Swal from 'sweetalert2';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {
  search:any='';
  limit:any = 10;
  page:any = 1;
  totalRows:any = 0;
  order_by:any = 'id'; 
  order_type:any = 'desc';
  toggleVal:boolean = false;
  data:any=[];

  title:any ;
  thumbnail:any;
  description:any;
  category:any;
  created:any;

  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService:ApiService,private alertService:AlertService){  } 

  ngOnInit() {
    this.getData();
  }

  // ---------------------      custome methods      -----------------------  ||

  getData() {           //  Data Get databes   ---------------------------------
    let url:string = `/template?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}&search=${this.search}`;
    this.apiService.get(url, {}).subscribe((data:any) => {
      // console.log('data',data.data);
        if(data && data.status){
          this.page = data.data.page;
          this.data = data.data.data; 
          this.totalRows = data.data.total;
        }else{
          this.alertService.error(data.message);  // data.message -----
        }
      }
    );
  }

  pageChange(e:any){    //  Page Change funcation   -----------------------------
    console.log('pageChange',e)
  }

  getTOFROM(){          //  pagination List  offset  ----------------------------
    let offset = (this.page -1 )*this.limit; 
    let l = this.limit;
    let lastOffset = parseInt(l)+offset; 
    return `${offset+1} to ${lastOffset}`;
  } 

  sortBy(key:any){      //  Table - Order by asc/decs ---------------------------
    this.order_by = key; 
    if(this.order_type == 'asc'){
      this.order_type = 'desc'; 
    }else{
      this.order_type = 'asc';
    }
    this.getData(); 
  }

  showRow(id:any) {     //  Display one line of Data  --------------------------
    let url = '/template/show?id='+id;
    this.apiService.get(url, {}).subscribe((data:any) => {
      if(data && data.status){
        var rowData = data.data.data[0];
        this.title = rowData.title;
        this.thumbnail = rowData.thumbnail;
        this.description = rowData.description;
        this.category = rowData.category;
        this.created = rowData.created;
      } else {
        this.alertService.error(data.message);
      }
    });
  }

  deleteRow(id:any) {   //  Delete Row Function     ----------------------------
    Swal.fire({
      title: 'DELETE ROW ?',
      text: 'Do You Want to Delete This Row',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go Ahead.',
      cancelButtonText: 'No, Let me Think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('SuccessFully !', 'Row Deleted Successfully.', 'success');
        let url:string = `/template/delete?id=${id}`;
        this.apiService.get(url, {}).subscribe((data:any) => {
          this.getData(); 
          console.log('deleteRow Status -',data.status) ;   
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Row Still in Our Database.', 'error');
      }
    });
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // Sidebar manage --------
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }
}
