import { Component } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AlertService } from 'src/app/_services/alert.service';
import Swal from 'sweetalert2';
import { ngxCsv } from 'ngx-csv/ngx-csv';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  search:any='';
  limit:any = 10;
  page:number = 4;
  totalRows:any = 0;
  order_by:any = 'id'; 
  order_type:any = 'desc';
  toggleVal:boolean = false;
  data:any=[];
  delete:any;
  fname:string = '';
  lname:string = '';
  email:string = '';
  mobile:string = '';
  image:string = '';
  created:string = '';

  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService:ApiService,private alertService:AlertService){  } 

  ngOnInit() {
    this.getData();
  }

  // ---------------------      custome methods      -----------------------  ||

  getData() {           //  Data Get databes   ---------------------------------
    let url:string = `/user?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}&search=${this.search}`;
    this.apiService.get(url , {}).subscribe((data:any) => {
      if(data && data.status){
        this.limit = data.data.limit;
          this.page = data.data.page;
          this.data = data.data.data; 
          this.totalRows = data.data.total;
        }else{
          this.alertService.error('Data Fatch Failed..');  // data.message -----
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

  exportList() {        //  Export All Data in list   --------------------------
    Swal.fire({
      title: 'Export List !',
      text: 'Save Thi Whole List in CSV File',
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go Ahead.',
      cancelButtonText: 'No, Let me Think',
    }).then((result) => {
      if (result.value) {
        console.log('CSV File Download');
        var options = { 
          title: 'Your Title',
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: false, 
          noDownload: false,
          showTitle: false,
          useBom: false,
          headers: ["Id","First Name","Last Name","Email","Mobile","Image","Created"]
        };
        new ngxCsv(this.data, "Contact List", options);  // download CSV ------
        Swal.fire('SuccessFully !', 'List Removed Successfully.', 'success');

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'List  Still in Our Database.', 'error');
      }
    });
  }

  showRow(id:any) {     //  Display one line of Data  --------------------------
    console.log('Show id =', id);
    let url:string = `/user/show?id=${id}`;
    this.apiService.get(url , {}).subscribe((data:any) => {
      if(data && data.status){
        this.fname = data.data[0].fname;
        this.lname = data.data[0].lname;
        this.email = data.data[0].email;
        this.mobile = data.data[0].mobile;
        this.image = data.data[0].image;
        this.created = data.data[0].created;
      }else{
        this.alertService.error('Data Fatch Failed..');  // data.message -----
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
        let url:string = `/user/delete?id=${id}`;
        this.apiService.get(url , {}).subscribe((data:any) => {
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
