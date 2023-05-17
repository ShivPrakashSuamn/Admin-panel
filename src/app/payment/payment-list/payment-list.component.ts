import { Component } from '@angular/core';
import { ApiService } from "src/app/_services/api.service";
import { AlertService } from 'src/app/_services/alert.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent {
  toggleVal: boolean = false;
  data: any = [];
  page: any = 1;
  totalRows: any = 0;
  totalPage: any = 0;
  search: any = '';
  limit: any = 10;
  order_by: any = 'id';
  order_type: any = 'desc';
  createForm: FormGroup;
  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService) {
    this.createForm = fb.group({
      key:['YOUR_KEY_ID', [Validators.required]],
      amount: ['', [Validators.required]],
      currency: ['INR', [Validators.required]],
      name: ['shiv', [Validators.required]],
      description: ['Test Transaction"', [Validators.required]],
      image: ['https://example.com/your_logo', [Validators.required]],
      order_id: ['', [Validators.required]]  
    });
  }

  ngOnInit() {
    this.getData();
  }

  // ---------------------      custome methods      -----------------------  ||

  getData() {            //  Get data databes   -------------------------------- 
    let url = `/payment?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}&search=${this.search}`;
    this.apiService.get(url, {}).subscribe((data: any) => {
      if (data && data.status) {
        this.data = data.data.data;
        this.page = data.data.page;
        this.totalPage = data.data.totalPage;
        this.totalRows = data.data.allUser;
      } else {
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    });
  }

  pageChange(e: any) {    //  Page Change funcation   -----------------------------
    this.page = e;
    this.getData();
  }

  getTOFROM() {          //  pagination List  offset  ----------------------------
    let offset = (this.page - 1) * this.limit;
    let l = this.limit;
    let lastOffset = parseInt(l) + offset;
    return `${offset + 1} to ${lastOffset}`;
  }

  sortBy(key: any) {      //  Table - Order by asc/decs ---------------------------
    this.order_by = key;
    if (this.order_type == 'asc') {
      this.order_type = 'desc';
    } else {
      this.order_type = 'asc';
    }
    this.getData();
  }

  exportList() {        //  Export All Data in list   -------------------------- 
    Swal.fire({
      title: 'Export List !',
      text: 'SAVE thi whole list in CSV file',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        console.log('CSV file download');
        var options = {
          title: 'Your title',
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: false,
          noDownload: false,
          showTitle: false,
          useBom: false,
          headers: ["Id", "Plan", "User First Name", "User Last Name", "Payment Id", "Amount", "Status", "Created"]
        };
        new ngxCsv(this.data, "Contact list", options);  // download CSV ------
        Swal.fire('SuccessFully !', 'List removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'List  still in our database.', 'error');
      }
    });
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }
}
