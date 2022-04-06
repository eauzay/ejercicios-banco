import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { UpperLowerCasePipe } from './pipes/upperlowercase.pipe';
import { RoleNamePipe } from './pipes/roleName.pipe.';


@NgModule({
  declarations: [ModalComponent, UpperLowerCasePipe,RoleNamePipe],
  imports: [
    CommonModule
  ],
  exports: [ModalComponent,UpperLowerCasePipe, RoleNamePipe]
})
export class SharedModule { }
