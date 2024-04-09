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
import { MatIconModule } from '@angular/material/icon';
import { setRole } from '../../states/roleState/role.actions';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';


interface response {
  status: number,
  msg: string,
  token: string
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatRadioModule, HttpClientModule,RouterLink,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  hide: boolean = false;

  constructor(private builder: FormBuilder, private http: HttpClient,
    private toastr: ToastrService,private router: Router,
    private store: Store<AppState>) {
  }

  userform = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', Validators.required)
  });

  login() {
    //<any to response>
    this.http.post<response>('http://localhost:8000/auth/login', this.userform.value).subscribe(
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
          this.http.get("http://localhost:8000/auth/decodeToken").subscribe((resp: any) => {
          this.store.dispatch(setRole({ role_slug: resp.data.role_slug }));
      }, (error) => {
        console.error('Error:', error);
      });
          this.router.navigate(['../users']);
          sessionStorage.setItem("isLogin","true");
        }
      },
      error => {
        console.error('Error sending data:', error.error.msg);
        sessionStorage.setItem("isLogin","false");
        alert("Server Is not started. " + error.error.msg);
      }
    );
  }
  showError() {
    this.toastr.error('Wrong credentials!');
  }

}
