import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TopicPage } from './topic.page';
import { TopicPageRoutingModule } from './topic-routing.module';
import { MessageComponentModule } from '../message/message.module';
import { MenuComponentModule } from '../menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    TopicPageRoutingModule,
    MenuComponentModule
  ],
  declarations: [TopicPage]
})
export class TopicPageModule {}
