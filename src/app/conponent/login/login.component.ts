import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';


interface response {
  status: number,
  msg: string,
  token: string
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatRadioModule, HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private builder: FormBuilder, private http: HttpClient,
    private toastr: ToastrService,private router: Router,) {
  }

  userform = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', Validators.required)
  });
  login() {
    //<any to response>
    this.http.post<response>('http://localhost:8000/login', this.userform.value).subscribe(
      response => {
        const message = response.msg;
        const status = response.status;
        console.log("hy " + status)
        if (status == 403) {
          this.showError();
          sessionStorage.setItem("isLogin","false");
        }
        if(status==200){
          localStorage.setItem('token', response.token);
          this.router.navigate(['../list']);
          sessionStorage.setItem("isLogin","true");
        }
      },
      error => {
        console.error('Error sending data:', error.error.msg);
        sessionStorage.setItem("isLogin","false");
        alert(error.error.msg);
      }
    );
  }
  showError() {
    this.toastr.error('Wrong credentials!');
  }

}
