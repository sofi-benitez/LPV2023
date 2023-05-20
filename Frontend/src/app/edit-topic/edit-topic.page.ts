import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import axios from 'axios';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.page.html',
  styleUrls: ['./edit-topic.page.scss'],
})
export class EditTopicPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  topico : any = {};

  constructor(private toastController: ToastController,
   private router: Router) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.get("http://localhost:3000/topic/" + id)
    .then( result => {
      if (result.data.success == true) {

        if( result.data.topico != null){
          this.topico = result.data.topico;
        }else{
          this.topico = {};
        }
       
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
    

    
  }

  saveTopic(){
    let token = localStorage.getItem("token");

    let config = { 
        headers :{
          "Authorization" : token
        }
    };

    console.log("topico", this.topico);
    var data = {
      id : this.topico.id,
      name: this.topico.name,
      create_date: this.topico.create_date,
      order: this.topico.order,
      priority: this.topico.priority,
      color: this.topico.color

    }

    axios.post("http://localhost:3000/topics/update", data, config)
    .then(  async result => {
      if (result.data.success == true) {
        this.presentToats ("Topico Guardado!!!");
          this.router.navigate(["/home"]);
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
