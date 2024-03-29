import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavComponent } from "../../nav/nav.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-id',
  standalone: true,
  templateUrl: './list-id.component.html',
  styleUrl: './list-id.component.scss',
  imports: [HttpClientModule, NavComponent, RouterLink, RouterLinkActive]
})
export class ListIdComponent implements OnInit {
  isloading = true;
  id?: any;
  httpClient = inject(HttpClient);
  userData?: any;
  showData: any;
  constructor(private activatedRoute: ActivatedRoute,private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = id;
    this.fetchData()
  }

  fetchData() {
    this.httpClient.get("http://localhost:8000/user/" + this.id).subscribe((data: any) => {
      this.userData = data;
      if(data.status == 401){
        this.toastr.error('Session Expired');
        localStorage.clear()
        this.router.navigate(['../login']);
      }
      this.isloading = false;
    });
  }

  convertTimestampToDateTime(timestamp: string | number | Date) {
    if(timestamp==null){
      return "N/A"
    }
    const dateTimeUTC = new Date(timestamp);
    return dateTimeUTC.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }
}
