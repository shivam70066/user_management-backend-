import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavComponent } from "../../nav/nav.component";


interface response {
  status: number,
  data?: object,
  msg: string
}
@Component({
    selector: 'app-add-user',
    standalone: true,
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss',
    imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatRadioModule,
        HttpClientModule, MatIconModule, RouterLink, NavComponent,MatSelectModule]
})
export class AddUserComponent {
  hide: boolean = false;

  constructor(private builder: FormBuilder, private http: HttpClient, private router: Router,
    private toastr: ToastrService) {

  }
  userform = this.builder.group({
    name: this.builder.control('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,}')]),
    email: this.builder.control('', [Validators.required, Validators.email],),
    password: this.builder.control('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    number: this.builder.control('', [Validators.required, Validators.pattern('.{10,10}')]),
    gender: new FormControl('male', [Validators.required]),
    roleID: this.builder.control('',[Validators.required]),
  });


  valid: boolean = false;


  save() {
    if(this.userform.value.name?.trim()==""){
      this.toastr.error("Name Can't be empty");
      return;
    }
    this.http.post<response>('http://localhost:8000/user', this.userform.value).subscribe(
      response => {
        const message = response.msg;
        const status = response.status;
        if (response.status == 200) {
          this.toastr.success('User Added');
          this.router.navigate(['../login']);
        }
        if (response.status == 403) {
          this.showEmailAlreadyRegisterd();
          this.valid = true;
        }
      },
      error => {
        console.error('Error sending data:', error.error.msg);
        alert(error.error.msg);
      }
    );
  }

  showEmailAlreadyRegisterd() {
    this.toastr.error('Email already taken.');
  }
}
