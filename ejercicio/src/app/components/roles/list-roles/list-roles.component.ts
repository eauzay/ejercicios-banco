import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../models/role';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {

  id!: number;
  position!: number;
  listRoles: Role[] = [];
  listTemp: Role[] = [];

  constructor(private _roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._roleService.getRoles().subscribe(
      (response) => {
        if (response)
          this.listRoles = response;
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

  delete() {
    this._roleService.deleteRole(this.id).subscribe(
      (response) => {
        if (response) {
          document.getElementById("closeModal")?.click();
          alert("Rol eliminado satisfactoriamente");
        
          this.getAll();
        }
      },
      (error) =>{
        alert('No se pudo eliminar el rol');
      }
    )
  }
}
