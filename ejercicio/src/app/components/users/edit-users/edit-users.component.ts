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
    //  let data = sessionStorage.getItem('data');
    let roles = sessionStorage.getItem('roles');
    //  this.listUsers = (data !== null) ? JSON.parse(data) : null;
    this.listRoles = (roles !== null) ? JSON.parse(roles) : null;

  }

  ngOnInit(): void {
    // let user: any;
    this.id = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.initForm();

    if (this.id) {
      this.title = "Editar Usuario";
      this.getUserById();
      // this.userEdit = this.listUsers.find(x => x.id === this.id);
    }
    else {
      this.title = "Crear Usuario";
      //this.userEdit = null;
    }

    // this.initForm(this.userEdit);
  }

  initForm() {
    this.form = this.formBuilder.group({
      // id: new FormControl((userEdit) ? userEdit.id : '', Validators.required),
      // name: new FormControl((userEdit) ? userEdit.name : '', Validators.required),
      // identification: new FormControl((userEdit) ? userEdit.identification : '', Validators.required),
      // city: new FormControl((userEdit) ? userEdit.city : '', Validators.required),
      // idRole: new FormControl((userEdit) ? userEdit.idRole : '', Validators.required)

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

  // getUser() {
  //   let user: User;

  //   user = {
  //     id: (this.id) ? this.id : this.listUsers.length + 1,
  //     name: this.form.get('name')?.value,
  //     identification: this.form.get('identification')?.value,
  //     city: this.form.get('city')?.value,
  //     idRole: this.form.get('idRole')?.value
  //   }

  //   return user;
  // }

  editUser(user: User) {
    // let position;
    // position = this.listUsers.indexOf(this.userEdit);
    // this.listUsers[position] = user;
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

    // this.listUsers.push(user);
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
    //let user: User;
    //user = this.getUser();

    const user = this.form.getRawValue();

    if (this.id) {
      this.editUser(user)
    } else {
      this.createUser(user);
    }

    // sessionStorage.setItem('data', JSON.stringify(this.listUsers));
    this.form.reset();
    this.router.navigate(['/users/list'])
  }
}
