import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  signForm: FormGroup;
  submitted: any = false;

  constructor(private fb: FormBuilder, private alertService: AlertService, private apiService: ApiService, private route: Router) {
    if (this.apiService.isLoggedIn()) {
      this.route.navigate(['/dashboard']);
    }
    this.signForm = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required]
    })
  }

  get f() {     //  Foem controls  -----------
    return this.signForm.controls;
  }

  submit() {    //  Submit databes -----------
    console.log('Submit Bottun Ckick');
    this.submitted = true;
    if (this.signForm.valid) {
      console.log('Sign Up Form Value =', this.signForm.value);
      let url = '/auth/register';
      let body = this.signForm.value;

      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      // Post data Node ----
      this.apiService.post(url, body, options).subscribe((data: any) => {
        console.log('Form Result -', data.message)
        if (data.status) {
          this.alertService.success(data.message);
        } else {
          this.alertService.warning(data.message);
        }
      });
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  light() {     //  Ligth  Mood -------------
    document.body.style.background = "white";
  }
  dark() {     //  Daek  Mood  --------------
    document.body.style.background = "#060c21";

  }

}
