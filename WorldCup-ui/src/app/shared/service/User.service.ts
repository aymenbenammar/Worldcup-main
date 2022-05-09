import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";
import {LoginPayload} from "../../model/loginPayload";
import {CheckPwd} from "../../model/CheckPwd";
import {AjoutResponse} from "../../model/AjoutResponse";
import {LocalStorageService} from "ngx-webstorage";
import {Team} from "../../model/Team";
import {Player} from "../../model/Player";
import {Staff} from "../../model/Staff";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  getAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl + '/api/user/users'}?login=${
      this.localStorageService.retrieve('login')}`);
  }
  getAllTeams() : Observable<Array<Team>>{
    console.log(this.httpOptions);
    return this.http.get<Array<Team>>(this.baseUrl + '/teams', this.httpOptions)
  }
getAllPlayers():Observable<Array<Player>>{
  return this.http.get<Array<Player>>(this.baseUrl + '/players',this.httpOptions)
}
getAllStaff():Observable<Array<Staff>>{
  return this.http.get<Array<Staff>>(this.baseUrl + '/staffs',this.httpOptions)
}
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/api/user/addUser', user, this.httpOptions);
  }
addTeam(team : Team): Observable<Team>{
    return this.http.post<Team>(this.baseUrl+'/teams',team,this.httpOptions);
}
addPlayer(player:Player):Observable<Player>{
    console.log(player);
  return this.http.post<Player>(this.baseUrl+'/players',player,this.httpOptions);
}
addStaff(staff : Staff):Observable<Staff>{
  return this.http.post<Staff>(this.baseUrl+'/staffs',staff,this.httpOptions);
}
  deleteUser(id: number ): Observable<AjoutResponse> {
    return this.http.post<AjoutResponse>(this.baseUrl + '/api/user/deleteUser', JSON.stringify(id), this.httpOptions)
      .pipe(retry(1),
      catchError(this.handleError))
  }
  deleteTeam(id:number):Observable<AjoutResponse>{
   return this.http.delete<AjoutResponse>(this.baseUrl + '/teams/'+id, this.httpOptions)
     .pipe(retry(1),
       catchError(this.handleError))
  }
deletePlayer(id:number):Observable<AjoutResponse>{
  return this.http.delete<AjoutResponse>(this.baseUrl + '/players/'+id, this.httpOptions)
    .pipe(retry(1),
      catchError(this.handleError))
}
deleteStaff(id:number):Observable<AjoutResponse>{
  return this.http.delete<AjoutResponse>(this.baseUrl + '/staffs/'+id,this.httpOptions)
    .pipe(retry(1),
      catchError(this.handleError))
}
  getUserByLogin(login: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl + '/api/user/getUserByLogin'}?login=${login}`);
  }

  verifyPassword(loginDto: LoginPayload) {
    return this.http.post<boolean>(this.baseUrl + '/api/user/verifyPassword', loginDto, this.httpOptions)
      .pipe(retry(1),
        catchError(this.handleError))
  }

  checkPassword(checkPwd: CheckPwd) {
    return this.http.post<boolean>(this.baseUrl + '/api/user/checkPassword', checkPwd, this.httpOptions)
      .pipe(retry(1),
        catchError(this.handleError))
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl + '/api/user/getUserById'}?id=${id}`);
  }


  // Error handling
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
