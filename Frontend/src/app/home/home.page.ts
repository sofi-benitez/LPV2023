import { Component, inject, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { IonicModule, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  private data = inject(DataService);

  usuarios : any = [];

  constructor(private toastController: ToastController,
    private router: Router) {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
  
  ionViewWillEnter(): void {
    this.getUsers();
  }

  ngOnInit(): void {
    //this.getUsers();
  }

  getUsers () {
    axios.get("http://localhost:3000/users/list")
    .then( result => {
      if (result.data.success == true) {
        this.usuarios = result.data.usuarios;
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }

  deleteUser(id: number){

    axios.delete(`http://localhost:3000/users/delete/${id}`)
    .then(  async result => {
      if (result.data.success == true) {
        console.log("Usuario Eliminado nro: ", id);
        this.presentToats ("Usuario eliminado!!!");
        this.getUsers();
      } else {
        this.presentToats (result.data.error );
        
      }
      
    }).catch( async error => {
      this.presentToats (error.message.data.error );
    })
  }

  async presentToats (message : string){
    const toast = await this.toastController.create({
      message:message,
      duration: 1500,
      position: 'bottom',
      });

    await toast.present();
  }
}
