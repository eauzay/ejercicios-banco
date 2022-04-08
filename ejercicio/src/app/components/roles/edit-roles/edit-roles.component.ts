import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Role } from '../../../models/role';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../service/role.service';

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
  roleEdit!: Role;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private currentRoute: ActivatedRoute, private _roleService: RoleService) {
  }

  ngOnInit(): void {
    this.id = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.initForm();

    if (this.id) {
      this.title = "Editar Rol";
      this.getRoleById();
    }
    else {
      this.title = "Crear Rol";
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  getRoleById() {
    this._roleService.getRoleById(this.id).subscribe(
      (response) => {
        this.roleEdit = response;
        this.form.get('id')?.setValue(this.roleEdit.id);
        this.form.get('name')?.setValue(this.roleEdit.name);
        this.form.get('description')?.setValue(this.roleEdit.description);
      },
      (error) => {
        alert('No se pudo obtener el rol');
      }
    )
  }

  editRole(role: Role) {
    this._roleService.updateRole(this.id, role).subscribe(
      (response) => {
        if (response) {
          alert('Rol actualizado satisfactoriamente');
        }
      },
      (error) => {
        alert('No se pudo editar el rol');
      }
    );
  }

  createRole(role: Role) {
    this._roleService.newRole(role).subscribe(
      (response) => {
        if (response) {
          alert('Rol creado satisfactoriamente');
        }
      },
      (error) => {
        alert('No se pudo crear el rol');
      }
    );
  }

  onClickSaveButton() {
    const rol = this.form.getRawValue();

    if (this.id) {
      this.editRole(rol)
    } else {
      this.createRole(rol);
    }

    this.form.reset();
    this.router.navigate(['/roles/list'])
  }
}
