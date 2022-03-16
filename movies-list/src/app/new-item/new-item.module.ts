import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaItemFormComponent } from './media-item-form.component';
import { newItemRouting } from './new-item.routing';

@NgModule({
  declarations: [
    MediaItemFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    newItemRouting
  ]
})
export class NewItemModule { }
