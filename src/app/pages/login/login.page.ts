import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  credentials = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { 
    this.authService.getCurrentUser().subscribe((user) => {
      if(user){
        this.router.navigateByUrl('/folder/home',  { replaceUrl: true })
      }
    })
  }

  ngOnInit() {
    //this.clearFormFields();
  }

    get email(){
      return this.credentials.controls.email;
    }
  
    get password(){
      return this.credentials.controls.password;
    }

    async login() {
      const loading = await this.loadingController.create();
      await loading.present();
    
      
      const { data, error } = await this.authService.signIn(this.credentials.getRawValue());
      await loading.dismiss();
    
      if (error) {
        this.showAlert("Login failed", error.message);
      } 
      /*else {
        // Successful login, navigate to another page or perform necessary actions
        this.router.navigate(['/folder/home']); // Replace '/dashboard' with the desired destination
      }*/
    }
    
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Receive a new password',
      message: 'Please insert your email',
      inputs: [{
        type: 'email',
        name: 'email',
      },],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Reset password',
        handler: async (result) => {
          const loading = await this.loadingController.create();
          await loading.present();
          const { data, error } = await this.authService.sendPasswordReset(
            result.email
          );
          await loading.dismiss();

          if (error) {
            this.showAlert('Failed', error.message);
          } else {
            this.showAlert('Sucess', 'Please check your email');
          }
        },
      },],
    });
    await alert.present();
  }

  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  /*private clearFormFields() {
    this.credentials.reset();
  }

  ionViewWillEnter() {
    this.clearFormFields();
  }
  */

}
