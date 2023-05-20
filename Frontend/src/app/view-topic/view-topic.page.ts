import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import axios from 'axios';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-view-topic',
  templateUrl: './view-topic.page.html',
  styleUrls: ['./view-topic.page.scss'],
})
export class ViewTopicPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  topico : any = {};

  constructor() {}

  ngOnInit() {
    let token = localStorage.getItem("token");

    let config = { 
        headers :{
          "Authorization" : token
        }
    };
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.get("http://localhost:3000/topic/" + id, config)
    .then( result => {
      if (result.data.success == true) {
        this.topico = result.data.topico;
        
        console.log('token',config);
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
}
