import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
  }

  constructor(
    private http: HttpClient
  ) { }



  getRequest<T>(url: string,token:string){
    return this.http.get<T>(url,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ token
        })
      });
  }

  postRequest<T>(url: string, dataModel: unknown,token:string): Observable<T>{
    return this.http.post<T>(url, dataModel,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ token
        })
      });
  }

  patchRequest(url: string, dataModel: unknown){
    return this.http.patch(url, dataModel);
  }

  putRequest<t>(url: string, dataModel: unknown){
    return this.http.put<t>(url, dataModel);
  }

  deleteRequest<t>(url: string){
    return this.http.delete<t>(url);
  }

  getRequestWithParamsAndBlob(url: string, params: any){
    return this.http.get(url,{ responseType: 'arraybuffer',params: params});
  }

  getRequestWithParams<T>(url: string, params: any){
    return this.http.get<T>(url, {params: params});
  }

  postFormDataRequest(url: string, dataModel: unknown){
    return this.http.post(url, dataModel,this.httpOptions);
  }

  putFormDataRequest(url: string, dataModel: unknown){
    return this.http.put(url, dataModel,this.httpOptions);
  }

  async verifyToken(url: string, dataModel: any){
    return await this.http.post(url, dataModel).toPromise();
  }

  deleteRequestWithBody<t>(url: string,body:any){
    return this.http.delete<t>(url,body) as Observable<t>;
  }

}
