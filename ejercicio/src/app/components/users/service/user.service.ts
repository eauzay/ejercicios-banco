import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly api = "http://localhost:3000/users";

  constructor(public httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.api).pipe(
      map(resp => { return resp; })
    );
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.api + '/' + id);
  }

  newUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.api, user)
  }

  updateUser(id: number, param: User): Observable<User> {
    return this.httpClient.put<User>(this.api + '/' + id, param);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.api + '/' + id);
  }

}
