import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  listUsers!: Array<User>;
  listRoles!: Array<Role>;
  userEdit: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private currentRoute: ActivatedRoute) {
    let data = sessionStorage.getItem('data');
    let roles = sessionStorage.getItem('roles');
    this.listUsers = (data !== null) ? JSON.parse(data) : null;
    this.listRoles = (roles !== null) ? JSON.parse(roles) : null;
  }

  ngOnInit(): void {
    // let user: any;
    this.id = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.userEdit = this.listUsers.find(x => x.id === this.id);
    this.initForm(this.userEdit);
  }

  initForm(userEdit: any) {
    this.form = this.formBuilder.group({
      name: new FormControl(userEdit.name, Validators.required),
      identification: new FormControl(userEdit.identification, Validators.required),
      city: new FormControl(userEdit.city, Validators.required),
      idRole: new FormControl(userEdit.idRole, Validators.required)
    })
  }

  onClickSaveButton() {
    let user: User;
    let position;
    user = {
      id: this.id,
      name: this.form.get('name')?.value,
      identification: this.form.get('identification')?.value,
      city: this.form.get('city')?.value,
      idRole: this.form.get('idRole')?.value
    }
    // this.
    position = this.listUsers.indexOf(this.userEdit);
    this.listUsers[position] = user;
    // this.listUsers.push(user);
    sessionStorage.setItem('data', JSON.stringify(this.listUsers));
    this.form.reset();
    this.router.navigate(['/users/list'])
  }

}
