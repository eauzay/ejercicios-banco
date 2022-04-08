import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/models/role';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  readonly api = "http://localhost:3000/roles";

  constructor(public httpClient: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.api).pipe(
      map(resp => { return resp; })
    );
  }

  getRoleById(id: number): Observable<Role> {
    return this.httpClient.get<Role>(this.api + '/' + id);
  }

  newRole(role: Role): Observable<Role> {
    return this.httpClient.post<Role>(this.api, role)
  }

  updateRole(id: number, param: Role): Observable<Role> {
    return this.httpClient.put<Role>(this.api + '/' + id, param);
  }

  deleteRole(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.api + '/' + id);
  }

}
