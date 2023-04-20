import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.css']
})
export class PaymentUpdateComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  data: any = [];
  id: any = undefined;
  serverDeluxe:any = false;
  isShow:any=false;
  form: FormGroup;

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService) {
    this.createForm = fb.group({
      plan_id: ['', Validators.required],
      user_id: ['', Validators.required],
      payment_id: ['', Validators.required],
      amount: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.form = new FormGroup({
      passenger: new FormArray([
        new FormGroup({
          title: new FormControl(''),
          value: new FormControl('')
        })
      ])
    });
  }

  ngOnInit() {        //  ngOninit Function -------------------------
    this.id = this.route.snapshot.params['id'];
    if (this.id != undefined) {
      console.log('Update id =', this.id)
      this.getData();
      this.getUser();
    }
  }

  get f() {
    return this.createForm.controls;
  }

  // ----------------    custome methods   --------------------------  ||

  get passenger(): FormArray {
    return this.form.get('passenger') as FormArray;
  }

  addRow() {
    this.passenger.push(
      new FormGroup({
        title: new FormControl(''),
        value: new FormControl('')
      })
    );
  }

  deleteRow(id:any){
    this.passenger.removeAt(id)
  } 

  showTable(){    // features table   --------------------------------
    this.isShow = !this.isShow; 
  }

  submit() {    // Submit Form    -----------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      let url: string = `/payment/update?id=${this.id}`; 
      const body = this.createForm.value;
      this.apiService.post(url, body, {}).subscribe((data: any) => {
        console.log('Form Result -', data)
        if(data.status){
          this.alertService.success(data.message); // Alert---
        } else {
          this.alertService.warning(data.message); // Alert---
        }
      }); 
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  getData() {          // Upadte data get end input fill  ------------
    let url: string = `/payment/show?id=${this.id}`;
    this.apiService.get(url , {}).subscribe((data: any) => {
      if (data && data.status) {
        let userData = data.data[0];
        this.createForm = this.fb.group({
          plan_id: [`${userData.plan_id}`, Validators.required],
          user_id: [`${userData.user_id}`, Validators.required],
          payment_id: [`${userData.payment_id}`, Validators.required],
          amount: [`${userData.amount}`, Validators.required],
          status: [`${userData.status}`, Validators.required],
        });
      } else {
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    });
  }
  
  getUser() {           //  User data  -------------------------------
    let url:string = `/user`;
    this.apiService.get(url , {}).subscribe((data:any) => {
        if(data && data.status){
          this.data = data.data.data; 
        }else{
          this.alertService.error('Data Fatch Failed..');  // data.message -----
        }
      }
    );
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }
}