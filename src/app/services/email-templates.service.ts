import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailTemplatesService {
  http = inject(HttpClient)

  fetchTemplateData(slug:string):Observable<any>{
    return this.http.get("http://localhost:8000/emailTemplates/"+slug);
  }

  updateTemplate(slug:string, data: any): Observable<object> {
    return this.http.put("http://localhost:8000/emailTemplates/"+slug, data);
  }
}
