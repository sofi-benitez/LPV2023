import { Component, inject, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

import { DataService, Message } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { IonicModule, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-topic',
  templateUrl: 'topic.page.html',
  styleUrls: ['topic.page.scss'],
})

export class TopicPage implements OnInit{

  private data = inject(DataService);

  topicos : any = [];

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

    let token = localStorage.getItem("token");

    if (!token) {
      this.router.navigate(["/login"]);
      return;
    }

    this.getTopic();
  }

  ngOnInit(): void {
    //this.getUsers();
  }

  getTopic () {
    let token = localStorage.getItem("token");

    let config = { 
        headers :{
          "Authorization" : token
        }
    };
    axios.get("http://localhost:3000/topics/list", config)
    .then( result => {
      if (result.data.success == true) {
        this.topicos = result.data.topicos;
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }

  deleteTopic(id: number){
    let token = localStorage.getItem("token");

    let config = { 
        headers :{
          "Authorization" : token
        }
    };
    axios.delete(`http://localhost:3000/topics/delete/${id}`, config)
    .then(  async result => {
      if (result.data.success == true) {
        console.log("Topico Eliminado nro: ", id);
        this.presentToats ("Topico eliminado!!!");
        this.getTopic();
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
