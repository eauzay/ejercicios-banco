import { Component, OnInit } from '@angular/core';
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
  title!: string;
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

    if (this.id) {
      this.title = "Editar Usuario";
      this.userEdit = this.listUsers.find(x => x.id === this.id);
    }
    else {
      this.title = "Crear Usuario";
      this.userEdit = null;
    }
    this.initForm(this.userEdit);
  }

  initForm(userEdit: any) {
    this.form = this.formBuilder.group({
      name: new FormControl((userEdit) ? userEdit.name : '', Validators.required),
      identification: new FormControl((userEdit) ? userEdit.identification : '', Validators.required),
      city: new FormControl((userEdit) ? userEdit.city : '', Validators.required),
      idRole: new FormControl((userEdit) ? userEdit.idRole : '', Validators.required)
    })
  }

  getUser() {
    let user: User;

    user = {
      id: (this.id) ? this.id : this.listUsers.length + 1,
      name: this.form.get('name')?.value,
      identification: this.form.get('identification')?.value,
      city: this.form.get('city')?.value,
      idRole: this.form.get('idRole')?.value
    }

    return user;
  }

  editUser(user: User) {
    let position;
    position = this.listUsers.indexOf(this.userEdit);
    this.listUsers[position] = user;
  }

  createUser(user: User) {
    this.listUsers.push(user);
  }

  onClickSaveButton() {
    let user: User;
    user = this.getUser();

    if (this.id) {
      this.editUser(user)
    } else {
      this.createUser(user);
    }

    sessionStorage.setItem('data', JSON.stringify(this.listUsers));
    this.form.reset();
    this.router.navigate(['/users/list'])
  }
}
