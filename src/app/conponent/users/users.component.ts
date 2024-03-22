import { GetdataService } from './../../services/getdata.service';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  providers: [GetdataService],
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {


  httpClient = inject(HttpClient);
  isloading:boolean = true;
  // Fulldata: any[] = [];
  // showData: any[] = [];


  constructor() {
    // Create 100 users
    this.httpClient.get('https://jsonplaceholder.typicode.com/users?_start=${start}&_end=${end}').subscribe((data: any) => {
      console.log(data)
      setTimeout(() => {
        this.isloading=false;
      }, 500);
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource)
    },error=>{
      console.log("Error from Api")
    });
    // Assign the data to the data source for the table to render
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'firstname', 'email', 'phone'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}







