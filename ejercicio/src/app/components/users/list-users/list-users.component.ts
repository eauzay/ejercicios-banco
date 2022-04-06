import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user';
import { listUsers } from '../../auth/login/data';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  position!: number;
  listUsers: User[] = [];
  listTemp: User[] = [];// Array<User>;
  @ViewChild('txtFind') txtFind!: ElementRef<HTMLInputElement>;

  constructor() {
    let data = sessionStorage.getItem('data');
    this.listUsers = (data !== null) ? JSON.parse(data) : null
    this.listTemp = (data !== null) ? JSON.parse(data) : null

  }

  ngOnInit(): void {
  }

  onClickButtonDelete(position: number) {
    this.position = position;
  }

  delete() {
    if (this.position != 0) {
      this.listUsers.splice(this.position, 1);
      sessionStorage.setItem('data', JSON.stringify(this.listUsers));
      document.getElementById("closeModal")?.click();
    }
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
