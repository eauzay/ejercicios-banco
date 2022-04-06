import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.css']
})
export class CreateRolesComponent implements OnInit {
  form!: FormGroup;
  listRoles!: Array<Role>;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    let data = sessionStorage.getItem('roles');
    this.listRoles = (data !== null) ? JSON.parse(data) : null
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  onClickSaveButton() {
    let role: Role;
    role = {
      id: this.listRoles.length + 1,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value
    }

    this.listRoles.push(role);
    sessionStorage.setItem('roles', JSON.stringify(this.listRoles));
    this.form.reset();
    this.router.navigate(['/roles/list'])
  }

}
