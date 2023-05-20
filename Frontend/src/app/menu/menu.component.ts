import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IonicModule, Platform, ToastController } from '@ionic/angular';

import axios from 'axios';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  constructor(private toastController: ToastController,
    private router: Router) {}

  ngOnInit() {}

  logout(){
    let token = localStorage.getItem("token");

    let config = { 
        headers :{
          "Authorization" : token
        }
    };
    console.log("token", config);

    axios.post("http://localhost:3000/user/logout", config)
    .then(  async result => {
      if (result.data.success == true) {
        
        localStorage.removeItem('token');
        this.presentToats ("Usuario deslogueado!!!");

        this.router.navigate(['/login']);
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
