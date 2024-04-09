import { Interface } from './interfaces/interface';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { HttpClient } from '@angular/common/http';
import { AppState } from './states/app.state';
import { Store } from '@ngrx/store';
import { selectRole } from './states/roleState/role.selector';
import { setRole } from './states/roleState/role.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NavComponent],
})



export class AppComponent implements OnInit {
  title = 'My App';

  http: HttpClient = inject(HttpClient);
  constructor( private store: Store<AppState>) {
  }


  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.http.get("http://localhost:8000/auth/decodeToken").subscribe((resp: any) => {
          this.store.dispatch(setRole({ role_slug: resp.data.role_slug }));
      }, (error) => {
        console.error('Error:', error);
      });
    }
  }
}

