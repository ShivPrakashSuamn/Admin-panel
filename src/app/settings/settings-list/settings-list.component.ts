import { Component } from '@angular/core';
import { ApiService } from "src/app/_services/api.service";
import { AlertService } from 'src/app/_services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent {
  toggleVal:boolean = false;
  data:any = [];
  page:any = 1;
  totalRows:any = 0;
  totalPage:any = 0;
  search:any='';
  limit:any = 10;
  order_by:any = 'id'; 
  order_type:any = 'desc';
  userCount:any = '';

  key:String = '';
  value:String = '';
  type:String = '';
  created:any = '';

  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService:ApiService,private alertService:AlertService){

  }

  ngOnInit(){
    this.getData();
  }

  // ---------------------      custome methods      -----------------------  ||
  
  getData() {           //  Data Get databes   ---------------------------------
    let url:string = `/setting?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}&search=${this.search}`;
    this.apiService.get(url, {}).subscribe((data:any) => {
      if(data && data.status){
        this.page = data.data.page;
        this.data = data.data.data;
        console.log('data', this.data) 
        this.totalRows = data.data.allUser;
        this.totalPage = data.data.totalPage;
        }else{
          this.alertService.error(data.message);  // data.message -----
        }
      }
    );
  }

  pageChange(e:any){
    this.page = e;
    this.getData();
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
    let url = '/setting/show?id='+id;
    this.apiService.get(url, {}).subscribe((data:any) => {
      if(data && data.status){
        var rowData = data.data[0];
        this.key = rowData.key;
        this.value = rowData.value;
        this.type = rowData.type;
        this.created = rowData.created;
      } else {
        this.alertService.error(data.message);
      }
    });
  }

  deleteRow(id:any) {   //  Delete Row Function     ----------------------------
    console.log('id -->',id);
    Swal.fire({
      title: 'DELETE ROW ?',
      text: 'Do you want to delete this row',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('SuccessFully !', 'Row deleted Successfully.', 'success');
        let url:string = `/setting/delete?id=${id}`;
        this.apiService.get(url , {}).subscribe((data:any) => {
          this.getData(); 
          console.log('deleteRow Status -',data.status) ;   
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Row still in our database.', 'error');
      }
    });
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }
}
