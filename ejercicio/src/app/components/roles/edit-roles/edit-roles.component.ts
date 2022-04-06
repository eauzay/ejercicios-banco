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
  form!: FormGroup;
  id!: number;
  listRoles!: Array<Role>;
  roleEdit: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private currentRoute: ActivatedRoute) {
    let data = sessionStorage.getItem('roles');
    this.listRoles = (data !== null) ? JSON.parse(data) : null
  }

  ngOnInit(): void {
    // let user: any;
    this.id = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.roleEdit = this.listRoles.find(x => x.id === this.id);
    this.initForm(this.roleEdit);
  }

  initForm(roleEdit: any) {
    this.form = this.formBuilder.group({
      name: new FormControl(roleEdit.name, Validators.required),
      description: new FormControl(roleEdit.description, Validators.required)
    })
  }

  onClickSaveButton() {
    let role: Role;
    let position;
    role = {
      id: this.id,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value
    }
    // this.
    position = this.listRoles.indexOf(this.roleEdit);
    this.listRoles[position] = role;
    // this.listRoles.push(user);
    sessionStorage.setItem('roles', JSON.stringify(this.listRoles));
    this.form.reset();
    this.router.navigate(['/roles/list'])
  }

}

