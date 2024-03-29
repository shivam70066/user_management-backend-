import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private httpClient: HttpClient) { }

  getusers(pageIndex:number,
    pagePerItem:number,
    searchTerm:string,
    sortBy: string,
    sortOrder:string
    ):Observable<any>{

    return this.httpClient.get("http://localhost:8000/users?sortBy="+ sortBy +"&sortOrder=" + sortOrder +"&searchTerm="+ searchTerm+"&pageIndex="+pageIndex+"&pagePerItem="+pagePerItem);
  }

  deleteUser(userId:number):Observable<any>{

    return this.httpClient.delete<any>("http://localhost:8000/user/"+userId);
  }
}
