import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../models/role';
import { UserService } from '../service/user.service';

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
  userEdit!: User;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private currentRoute: ActivatedRoute, private _userService: UserService) {
    let roles = sessionStorage.getItem('roles');
    this.listRoles = (roles !== null) ? JSON.parse(roles) : null;
  }

  ngOnInit(): void {
    this.id = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.initForm();

    if (this.id) {
      this.title = "Editar Usuario";
      this.getUserById();
    }
    else {
      this.title = "Crear Usuario";
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      idRole: new FormControl('', Validators.required),
    })
  }

  getUserById() {
    this._userService.getUserById(this.id).subscribe(
      (response) => {
        this.userEdit = response;
        this.form.get('id')?.setValue(this.userEdit.id);
        this.form.get('name')?.setValue(this.userEdit.name);
        this.form.get('identification')?.setValue(this.userEdit.identification);
        this.form.get('city')?.setValue(this.userEdit.city);
        this.form.get('idRole')?.setValue(this.userEdit.idRole);
      },
      (error) => {
        alert('No se pudo obtener el usuario');
      }
    )
  }

  editUser(user: User) {
    this._userService.updateUser(this.id, user).subscribe(
      (response) => {
        if (response) {
          alert('Usuario actualizado satisfactoriamente');
        }   
      },
      (error) => {
        alert('No se pudo editar el usuario');
      }
    );
  }

  createUser(user: User) {
    this._userService.newUser(user).subscribe(
      (response) => {
        if (response) {
          alert('Usuario creado satisfactoriamente');
        }
      },
      (error) => {
        alert('No se pudo crear el usuario');
      }
    );
  }

  onClickSaveButton() {
    const user = this.form.getRawValue();

    if (this.id) {
      this.editUser(user)
    } else {
      this.createUser(user);
    }

    this.form.reset();
    this.router.navigate(['/users/list'])
  }
}
