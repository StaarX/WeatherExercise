import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private aux;
  apiURL = 'http://localhost:3000/api/weather';

obregonlat="27.496031"
obregonlon="-109.932838"
hermosillolat="29.072968"
hermosillolon="-110.955917"
nogaleslat="31.325680"
nogaleslon="-110.945778"
navojoalat="27.082350"
navojoalon="27.082350"

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control':' no-cache, no-store, must-revalidate',
      'Pragma':' no-cache'
    })
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }
  private extractData(res:string){
    let body=res;
    console.log(res);
    return body;
  }
  //getLast15Days
  getLast15Days(city:string):Observable<any>{
     console.log("aca mero: "+this.navojoalat);
    switch(city) {
      case "Ciudad Obregón":
        return this.http.get<any>(this.apiURL+'/getLast15Days/'+this.obregonlat+'&'+this.obregonlon,this.httpOptions).pipe(tap(data=>{
          console.log(data);
          return data;
        }),catchError(this.handleError));
        break;
      case "Nogales":
        return this.http.get<any>(this.apiURL+'/getLast15Days/'+this.nogaleslat+'&'+this.nogaleslon,this.httpOptions).pipe(tap(data=>{
          console.log(data);
          return data;
        }),catchError(this.handleError));
        break;
      case "Hermosillo":
        return this.http.get<any>(this.apiURL+'/getLast15Days/'+this.hermosillolat+'&'+this.hermosillolon,this.httpOptions).pipe(tap(data=>{
          console.log(data);
          return data;
        }),catchError(this.handleError));
        break;
      case "Navojoa":
        return this.http.get<any>(this.apiURL+'/getLast15Days/'+this.navojoalat+'&'+this.navojoalon,this.httpOptions).pipe(tap(data=>{
          console.log(data);
          return data;
        }),catchError(this.handleError));
        break;
      default:
          return this.http.get<any>(this.apiURL+'/getLast15Days/'+this.obregonlat+'&'+this.obregonlon,this.httpOptions).pipe(tap(data=>{
            console.log(data);
            return data;
          }),catchError(this.handleError));
    }
  
  }
  getCurrentWeather():Observable<any>{
  return this.http.get<any>(this.apiURL+'/getCurrentWeather/'+this.obregonlat+'&'+this.obregonlon,this.httpOptions).pipe(tap(data=>{
    console.log(data);
    return data;
  }));
  }
  
}
