import { GetdataService } from './../../services/getdata.service';

import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-listusers',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './listusers.component.html',
  providers: [GetdataService],
  styleUrl: './listusers.component.scss'
})
export class ListusersComponent implements AfterViewInit {
  isloading = true;
  httpClient = inject(HttpClient);
  Fulldata: any[] = [];
  showData: any[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }


  dataa: any = [];


  fetchData() {
    this.httpClient.get('https://jsonplaceholder.org/users').subscribe((data: any) => {
      this.Fulldata = data;
      this.isloading = false;
      this.showData = this.Fulldata.slice(0, 10)
      console.log(this.Fulldata)
      this.datasource = new MatTableDataSource<any>(this.Fulldata);
      console.log(this.datasource);
    });
  }


  datasource: MatTableDataSource<any> = new MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'email', 'number', 'age', 'address'];

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.datasource.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.fetchData();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

calculateAge(birthdateString: any) {

  const today = new Date();
  const birthDate = new Date(birthdateString);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  return age;
}

}
