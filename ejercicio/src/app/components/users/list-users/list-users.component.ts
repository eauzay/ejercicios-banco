import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  id!: number;
  position!: number;
  listUsers: User[] = [];
  listTemp: User[] = [];// Array<User>;
  @ViewChild('txtFind') txtFind!: ElementRef<HTMLInputElement>;

  constructor(private _userService: UserService) {
    //  let data = sessionStorage.getItem('data');
    // this.listUsers = (data !== null) ? JSON.parse(data) : null
    //this.listTemp = (data !== null) ? JSON.parse(data) : null
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._userService.getUsers().subscribe(
      (response) => {
        if (response)
          this.listUsers = response;
        this.listTemp = response;
      },
      (error) => {
        console.log();
      }
    );
  }

  onClickButtonDelete(id: number, position: number) {
    this.id = id;
    this.position = position;
  }

  // delete() {
  //   if (this.position != 0) {
  //     this.listUsers.splice(this.position, 1);
  //     sessionStorage.setItem('data', JSON.stringify(this.listUsers));
  //     document.getElementById("closeModal")?.click();
  //   }
  // }

  delete() {
    this._userService.deleteUser(this.id).subscribe(
      (response) => {
        if (response) {
          document.getElementById("closeModal")?.click();
          alert("Usuario eliminado satisfactoriamente");
        
          this.getAll();
        }
      },
      (error) =>{
        alert('No se pudo eliminar el usuario');
      }
    )
  }

  findText() {
    const valor = this.txtFind.nativeElement.value;

    if (valor) {
      this.listUsers = this.listUsers.filter(x => x.identification == valor);
    }
    else {
      this.listUsers = this.listTemp;
    }
  }
}
