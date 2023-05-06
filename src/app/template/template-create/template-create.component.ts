import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css']
})
export class TemplateCreateComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  data: any = [];
  id: any = undefined;
  temFile: any;
  categoryData: string = '';

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService) {
    this.createForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {        //  ngOninit Function -------------------------
    this.id = this.route.snapshot.params['id'];
    this.getCategory();
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
    this.temFile = target.files[0];
  }

  submit() {    // Submit Form    -----------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      let url: string = `/template/store`;
      if (this.id) {
        url = `/template/update?id=${this.id}`;
      }
      const body = this.createForm.value;
      let formData: FormData = new FormData();
      formData.append('category', body.category)
      formData.append('title', body.title)
      formData.append('description', body.description)
      if (this.id == undefined) {
        if (this.temFile) {
          formData.append('file', this.temFile, this.temFile.name);
        } else {
          formData.delete('file');
        }
      } else if (this.id != '') {
        if (this.temFile) {
          formData.append('file', this.temFile, this.temFile.name);
        } else {
          formData.delete('file');
        }
      }
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      this.apiService.post(url, formData, options).subscribe((data: any) => {
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
    let url: string = `/template/show?id=${this.id}`;
    this.apiService.get(url, {}).subscribe((data: any) => {
      if (data && data.status) {
        let userData = data.data.data[0];
        this.createForm = this.fb.group({
          category: [`${userData.category}`, Validators.required],
          title: [`${userData.title}`, Validators.required],
          description: [`${userData.description}`, Validators.required],
        });
      } else {
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    });
  }

  getCategory() {      //  get Category      ------------------------
    let url: string = `/setting/constant/TEMPLATE_CATEGORY`;
    this.apiService.get(url, {}).subscribe((data: any) => {
      if (data && data.status) {
        this.categoryData = data.data;
      } else {
        this.alertService.error(data.message);  // data.message -----
      }
    });
  }

  getImageName() {     // Selecte image name -------------------------
    if (this.temFile) {
      return this.temFile.name;
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
