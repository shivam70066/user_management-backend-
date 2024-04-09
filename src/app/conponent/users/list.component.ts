import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { Component, OnChanges, OnInit, SimpleChanges, inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, JsonPipe } from '@angular/common';
import Swal from 'sweetalert2'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavComponent } from "../../nav/nav.component";
import { GetdataService } from '../../services/getdata.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { selectRole } from '../../states/roleState/role.selector';
import { setRole } from '../../states/roleState/role.actions';



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
    JsonPipe, NavComponent,
    MatIconModule,
    MatButtonModule,
  AsyncPipe]
})
export class ListComponent implements OnInit {


  roleName$? : Observable<string>;
  isloading = true;
  httpClient = inject(HttpClient);
  dataService = inject(GetdataService)
  Fulldata: any[] = [];
  showData: any[] = [];
  msg?: number;
  fullDataSize!: number;
  start: number = 0;
  next: number = 10;
  data: any = 1;

  pageIndex: number = 0;
  pagePerItem: number = 10;
  searchTerm: string = "";
  sortBy: string = "user_created_at";
  sortOrder: string = "asc";
  value = '';
  debounceTimeout: any;


  setRole(){
    this.store.dispatch(setRole({ role_slug: 'changed' }));
  }



  search() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.searchTerm = this.value;
      this.getData(this.pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder);
    }, 500); // Adjust debounce time as needed
  }

  clearSearch() {
    this.searchTerm = "";
    this.value = "";
    this.getData(0, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder)

  }




  newData: any;

  ngOnInit(): void {

  }

  getData(pageIndex: number,
    pagePerItem: number,
    searchTerm: string,
    sortBy: string,
    sortOrder: string): void {
    this.dataService.getusers(pageIndex,
      pagePerItem,
      searchTerm,
      sortBy,
      sortOrder).subscribe(
        (response: Response) => {
          this.data = response;
          this.msg = this.data.status;
          if (this.msg != 200) {
            this.showError();
          }
          this.newData = this.data.data;
          this.length = this.data.count;
          this.isloading = false
        },
        (error: any) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  length?: number;
  pageSize: number = 5;
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
    this.isloading = true;
    this.getData(this.pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder)

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(private toastr: ToastrService, private router: Router,private store:Store<AppState>) {
    this.getData(0, 5, this.searchTerm, "user_created_at", "asc")
    this.roleName$ = this.store.select(selectRole)
  }



  delete(userId: number) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteUser(userId);

      }
    });
  }

  deleteUser(userId: number): void {
    this.dataService.deleteUser(userId).subscribe(
      (response: Response) => {

        this.data = response;
        this.msg = this.data.msg;
        this.getData(this.pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder)

      },
      (error: any) => {
        console.error('Error in deleting the user:', error);
      }
    );
  }

  showError() {
    this.toastr.error('Session Expired');
    localStorage.clear()
    this.router.navigate(['../login']);
  }

  convertTimestampToDateTime(timestamp: string | number | Date) {
    if (timestamp == null) {
      return "N/A"
    }
    const dateTimeUTC = new Date(timestamp);
    return dateTimeUTC.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

  sort(sortBy: string) {
    if (this.sortBy === sortBy) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    } else {
      this.sortBy = sortBy;
      this.sortOrder = "asc";
    }
    this.getData(this.pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder);
  }


}
