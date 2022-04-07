import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Role } from '../../../models/role';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit {
  title!: string;
  form!: FormGroup;
  id!: number;
  listRoles!: Array<Role>;
  roleEdit: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private currentRoute: ActivatedRoute) {
    let roles = sessionStorage.getItem('roles');
    this.listRoles = (roles !== null) ? JSON.parse(roles) : null;
  }

  ngOnInit(): void {
    this.id = Number(this.currentRoute.snapshot.paramMap.get('id'));

    if (this.id) {
      this.title = "Editar Rol";
      this.roleEdit = this.listRoles.find(x => x.id === this.id);
    }
    else {
      this.title = "Crear Rol";
      this.roleEdit = null;
    }
    this.initForm(this.roleEdit);
  }

  initForm(roleEdit: any) {
    this.form = this.formBuilder.group({
      name: new FormControl((roleEdit) ? roleEdit.name : '', Validators.required),
      description: new FormControl((roleEdit) ? roleEdit.description : '', Validators.required)
    })
  }

  getRole() {
    let role: Role;

    role = {
      id: (this.id) ? this.id : this.listRoles.length + 1,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value
    }

    return role;
  }

  edit(role: Role) {
    let position;
    position = this.listRoles.indexOf(this.roleEdit);
    this.listRoles[position] = role;
  }

  create(role: Role) {
    this.listRoles.push(role);
  }

  onClickSaveButton() {
    let role: Role;
    role = this.getRole();

    if (this.id) {
      this.edit(role)
    } else {
      this.create(role);
    }

    sessionStorage.setItem('roles', JSON.stringify(this.listRoles));
    this.form.reset();
    this.router.navigate(['/roles/list'])
  }
}