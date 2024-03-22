import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavComponent } from "../../nav/nav.component";



@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    imports: [HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, RouterLink,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        JsonPipe, NavComponent]
})
export class ListComponent implements OnInit {
  isloading = true;
  httpClient = inject(HttpClient);
  Fulldata: any[] = [];
  showData: any[] = [];
  fullDataSize!:number;
  start: number = 0;
  next: number = 10;
  data: any = 1;
  ngOnInit(): void {
    this.fetchData(0,5);
  }
  fetchData(start:number, end:number) {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users?_start=' + start + '&_end=' + end)
  .subscribe((data: any) => {
    this.showData = data;
    console.log(this.showData);
    this.isloading = false;
  });

  }

  next1() {
    this.start = this.start + 10;
    this.next = this.next + 10;
    this.showData = this.Fulldata.slice(this.start, this.next)
  }
  prev() {
    this.start = this.start - 10;
    this.next = this.next - 10;
    this.showData = this.Fulldata.slice(this.start, this.next)
  }

  calculateAge(birthdateString: any) {

    const today = new Date();
    const birthDate = new Date(birthdateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    return age;
  }



  length=10;

  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [2, 5, 10];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.isloading=true;
    this.fetchData((e.pageIndex*e.pageSize),(e.pageIndex*e.pageSize)+e.pageSize);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
