import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  data: any = [];
  id: any = undefined;
  img: any;
  profileImage: any;

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService) {
    this.createForm = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  ngOnInit() {        //  ngOninit Function -------------------------
    this.id = this.route.snapshot.params['id'];
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
    this.profileImage = target.files[0];
  }

  submit() {    // Submit Form    -----------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      let url: string = `/user/store`;
      if (this.id) {
        url = `/user/update?id=${this.id}`;
      }
      const body = this.createForm.value;
      let formData: FormData = new FormData();
      formData.append('fname', body.fname)
      formData.append('lname', body.lname)
      formData.append('email', body.email)
      formData.append('mobile', body.mobile)
      
      if (this.id == undefined) {
        if (this.profileImage) {
          formData.append('file', this.profileImage, this.profileImage.name);
        } else {
          formData.delete('file');
        }
      } else if (this.id != '') {
        if (this.profileImage) {
          formData.append('file', this.profileImage, this.profileImage.name);
        } else {
          formData.delete('file');
        }
      }
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      
      this.apiService.post(url, formData, options).subscribe((data: any) => {
        //console.log('Form Result -', data)
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

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }

  getData() {          // Upadte data get end input fill  ------------
    let url: string = `/user/show?id=${this.id}`;
    this.apiService.get(url, {}).subscribe((data: any) => {
      if (data && data.status) {
        let userData = data.data[0];
        this.img = userData.image;
        this.createForm = this.fb.group({
          fname: [`${userData.fname}`, Validators.required],
          lname: [`${userData.lname}`, Validators.required],
          email: [`${userData.email}`, Validators.required],
          mobile: [`${userData.mobile}`, Validators.required],
        });
      } else {
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    });
  }

  getImageName() {     // Selecte image name -------------------------
    if (this.profileImage) {
      return this.profileImage.name;
    } else if (this.img) {
      return this.img;
    } else {
      return 'Selete to Profile ?';
    }
  }
}
