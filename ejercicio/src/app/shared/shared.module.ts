import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { UpperLowerCasePipe } from './pipes/upperlowercase.pipe';


@NgModule({
  declarations: [ModalComponent, UpperLowerCasePipe],
  imports: [
    CommonModule
  ],
  exports: [ModalComponent,UpperLowerCasePipe]
})
export class SharedModule { }
