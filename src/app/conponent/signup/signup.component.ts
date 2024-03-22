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

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


interface response {
  status: number,
  data?: object,
  msg: string
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatRadioModule,
    HttpClientModule, MatIconModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  hide: boolean = false;

  constructor(private builder: FormBuilder, private http: HttpClient, private router: Router,
    private toastr: ToastrService) {

  }
  userform = this.builder.group({
    name: this.builder.control('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,}')]),
    email: this.builder.control('', [Validators.required, Validators.email],),
    password: this.builder.control('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    number: this.builder.control('', [Validators.required, Validators.pattern('.{10,10}')]),
    gender: new FormControl('male', [Validators.required])
  });


  valid: boolean = false;


  save() {
    //<any to response>
    this.http.post<response>('http://localhost:8000/signup', this.userform.value).subscribe(
      response => {
        const message = response.msg;
        const status = response.status;
        if (response.status == 200) {
          this.registered();
        }
        if (response.status == 403) {
          this.showEmailAlreadyRegisterd();
          console.log(this.userform.value.email)
          this.valid = true;
          console.log(this.valid)
        }
        console.log("hy " + status)
      },
      error => {
        console.error('Error sending data:', error.error.msg);
        alert(error.error.msg);
      }
    );
  }

  registered() {
    Swal.fire({
      title: 'Registered',
      icon: 'success',
      confirmButtonText: 'Go to login'
    }).then(() => {
      this.router.navigate(['../login']);
    });
  }

  showEmailAlreadyRegisterd() {
    this.toastr.error('Email already taken.');
  }


}



