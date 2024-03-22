import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-id',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './list-id.component.html',
  styleUrl: './list-id.component.scss'
})
export class ListIdComponent implements OnInit {
  isloading = true;
  id?:any;
  httpClient = inject(HttpClient);
  newData?:any;
  showData:any;
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id=id;
    this.fetchData()
  }

  fetchData() {
    this.httpClient.get("https://jsonplaceholder.org/users/"+this.id).subscribe((data: any) => {
      this.newData = data;
      this.isloading = false;
      // this.showData = this.newData.slice(0,10)
      console.log(data)
      console.log(this.newData)
    });
  }
}
