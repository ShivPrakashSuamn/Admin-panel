import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-settings-update',
  templateUrl: './settings-update.component.html',
  styleUrls: ['./settings-update.component.css']
})
export class SettingsUpdateComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  data: any = [];
  id: any = undefined;
  iamge: any;
  logoGet:any 
  settingData: string = '';

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService) {
    this.createForm = fb.group({
      type: ['', Validators.required],
      key: ['', Validators.required],
    });
  }

  ngOnInit() {        //  ngOninit Function -------------------------
    this.id = this.route.snapshot.params['id'];
    this.getType();
    if (this.id != undefined) {
      console.log('Update id =', this.id)
      this.getData();
    }
  }

  get f() {
    return this.createForm.controls;
  }

  // ----------------    custome methods   --------------------------  ||

  handleFileUpload(target: any) {  // iamge handle    ----------------
    this.iamge = target.files[0];
  }

  submit() {    // Submit Form    -----------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      let url: string = `/setting/store`;
      if (this.id) {
        url = `/setting/update?id=${this.id}`;
      }
      const body = this.createForm.value;
      let formData: FormData = new FormData();
      formData.append('type', body.type)
      formData.append('key', body.key)
      if (this.id == undefined) {
        if (this.iamge) {
          formData.append('file', this.iamge, this.iamge.name);
        } else {
          formData.delete('file');
        }
      } else if (this.id != '') {
        if (this.iamge) {
          formData.append('file', this.iamge, this.iamge.name);
        } else {
          formData.delete('file');
        }
      }
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      this.apiService.post(url, formData, options).subscribe((data: any) => {
       // console.log('Form Result -', data);
        if (data.status) {
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
    let url: string = `/setting/show?id=${this.id}`;
    this.apiService.get(url, {}).subscribe((data: any) => {
      if (data && data.status) {
        let userData = data.data[0];
        this.logoGet = userData.value;
        this.createForm = this.fb.group({
          type: [`${userData.type}`, Validators.required],
          key: [`${userData.key}`, Validators.required],
        });
      } else {
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    });
  }

  getType() {      //  get Type      ------------------------
    let url: string = `/setting/constant/SETTING_TYPE`;
    this.apiService.get(url, {}).subscribe((data: any) => {
      if (data && data.status) {
        this.settingData = data.data;
      } else {
        this.alertService.error(data.message);  // data.message -----
      }
    });
  }

  getImageName() {     // Selecte image name -------------------------
    if (this.iamge) {
      return this.iamge.name;
    } else if(this.logoGet) {
      return this.logoGet;
    } else {
      return 'Selete to File upload above ?';
    }
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }
}
