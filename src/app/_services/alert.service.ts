import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  success(msg:any){
    this.toastr.success('Success!',msg)
  }
  error(msg:any){
    this.toastr.error('Error!',msg)
  }
  warning(msg:any){
    this.toastr.warning('Warning!',msg)
  }
  info(msg:any){
    this.toastr.info('Info!',msg)
  }
}
