import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: ListRolesComponent },
      { path: 'create', component: CreateRolesComponent },
      { path: 'edit/:id', component: EditRolesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
