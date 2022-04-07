import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { EditRolesComponent } from './edit-roles/edit-roles.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditRolesComponent,
    ListRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }
