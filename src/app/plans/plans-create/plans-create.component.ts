import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-plans-create',
  templateUrl: './plans-create.component.html',
  styleUrls: ['./plans-create.component.css']
})
export class PlansCreateComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  id: any = '';
  admin_id: any = '';
  title: any = '';
  price: any = '';
  offer_price: any = '';
  total_sell: any = '';
  status: any = '';
  form: FormGroup;
  isShow: any = false;
  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService) {
    this.createForm = fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      offer_price: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.form = new FormGroup({
      passenger: new FormArray([
        new FormGroup({
          feature_name: new FormControl(''),
          feature_value: new FormControl('')
        })
      ])
    });
  }

  ngOnInit() {        //  ngOninit Function -------------------------
    this.id = this.route.snapshot.params['id'];
    if (this.id == undefined) {
      this.showTable();
    }
    if (this.id) {
      this.updateDataGet();
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
        feature_name: new FormControl(''),
        feature_value: new FormControl('')
      })
    );
  }

  deleteRow(id: any) {
    this.passenger.removeAt(id)
  }

  showTable() {    // features table   --------------------------------
    this.isShow = !this.isShow;
  }


  submit() {    // Submit Form    -----------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      console.log('Create Form Data =', this.createForm.value);

      var body = this.createForm.value;
      body.features = this.form.value.passenger;
      console.log('body', body)
      let url: string = '/plans/store';
      if (this.id) {
        url = `/plans/update?id=${this.id}`;
      }

      this.apiService.post(url, body, {}).subscribe((data: any) => {
        console.log('form result -', data);
        if (data.status) {
          this.alertService.success(data.message); // Alert---
        } else {
          this.alertService.warning(data.message); // Alert---
        }
      })
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  updateDataGet() {  //  Update Data Get   ------------------------------
    let url: string = `/plans/show?id=${this.id}`;
    this.apiService.get(url, {}).subscribe((data: any) => {
      if (data && data.status) {
        let planData = data.data.data[0];

        // let cateGory = data.data.category;
        // for (var i = 0; i < cateGory.lenght; i++) {
        //   this.addRow();
        //   var feature_name = cateGory[i]["feature_name"],
        //     feature_value = cateGory[i]["feature_value"]
        //   this.form = new FormGroup({
        //     passenger: new FormArray([
        //       new FormGroup({
        //         feature_name: new FormControl(`${feature_name}`),
        //         feature_value: new FormControl(`${feature_value}`)
        //       })
        //     ])
        //   });
        // }

        this.createForm = this.fb.group({
          admin_id: [`${planData.admin_id}`, Validators.required],
          title: [`${planData.title}`, Validators.required],
          price: [`${planData.price}`, Validators.required],
          offer_price: [`${planData.offer_price}`, Validators.required],
          total_sell: [`${planData.total_sell}`, Validators.required],
          status: [`${planData.status}`, Validators.required],
        });
      } else {
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    })
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }
}
