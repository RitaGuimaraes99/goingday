import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { error } from 'console';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private alertController: AlertController) { }

  changeEmail() {
    this.authService.updateEmail(this.email).then(() => {
      this.showAlert('Sucess', 'Email Changed!');
    })
    .catch((error) => {
      this.showAlert('Failed', error.message);
    });
  }
  
  changePassword() {
    this.authService.updatePassword(this.password).then(() => {
      this.showAlert('Sucess', 'Password Changed!');
    })
    .catch((error) => {
      this.showAlert('Failed', error.message);
    });
  }

  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
