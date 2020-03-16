import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { modalEnterAnimation, modalLeaveAnimation } from '../animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
  private modalCtrl: ModalController,
  private router: Router
  ) {}
  async showModal(){
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      enterAnimation: modalEnterAnimation,
      leaveAnimation: modalLeaveAnimation
    });
    await modal.present();

  }

  navigate(){
    this.router.navigate(['', 'detail'])
  }
}
