import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditUserPage } from './edit-user.page';

import { IonicModule } from '@ionic/angular';

import { EditUserPageRoutingModule as EditUserPageRoutingModule } from './edit-user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUserPageRoutingModule
  ],
  declarations: [EditUserPage]
})
export class EditUserPageModule {}
