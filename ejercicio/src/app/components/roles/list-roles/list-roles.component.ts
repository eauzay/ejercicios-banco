import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {

  position!: number;
  listRoles!: Array<Role>;

  constructor() {
    let data = sessionStorage.getItem('roles');
    this.listRoles = (data !== null) ? JSON.parse(data) : null
  }

  ngOnInit(): void {
  }

  onClickButtonDelete(position: number) {
    this.position = position;
  }

  delete() {
    if (this.position != 0) {
      this.listRoles.splice(this.position, 1);
      sessionStorage.setItem('roles', JSON.stringify(this.listRoles));
      document.getElementById("closeModal")?.click();

    }
  }
}

