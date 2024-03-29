import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private httpClient: HttpClient) { }

  getusers(){
    return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
  }
}
