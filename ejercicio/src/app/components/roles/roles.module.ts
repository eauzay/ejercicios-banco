import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { EditRolesComponent } from './edit-roles/edit-roles.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    EditRolesComponent,
    ListRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RolesModule { }
