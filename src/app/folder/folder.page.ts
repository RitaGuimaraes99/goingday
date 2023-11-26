import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
//import { ClipboardJS } from 'clipboard';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  supabase: SupabaseClient;
  viagens: any[] = [];

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private router: Router,
    private alertController: AlertController
  ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    //this.clipboard = new ClipboardJS('#share-button');
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getViagens();
  }

  async getViagens() {
    const userId = this.authService.getCurrentUserId();

    try {
      const result = await this.supabase.from('viagens').select('*').eq('user_id', userId);

      if (result.error) {
        throw new Error(result.error.message);
      }

      this.viagens = result.data;
    } catch (e) {
      this.showAlert('Failed', 'Try again');
      console.error('Error getting Viagens: ', e);
    }
  }  

  async shareViagens() {
    try {
      // Call the getViagens function to fetch the data
      await this.getViagens();
  
      // Convert the viagens data to a JSON string
      const viagensData = JSON.stringify(this.viagens);
  
      // Encode the viagensData string to make it URL-safe
      const encodedData = encodeURIComponent(viagensData);
  
      // Generate the shareable URL with the encoded data
      const baseUrl = 'http://localhost:8100';
      const route = '/folder/home';
      const shareableURL = `${baseUrl}${route}?data=${encodedData}`;
  
      // Create a temporary input element to facilitate the copying process
      const tempInput = document.createElement('input');
      tempInput.value = shareableURL;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
  
      // Show a success message to the user
      alert('Shareable link copied to clipboard.');
  
    } catch (e) {
      this.showAlert('Failed', 'Try again');
      console.error('Error sharing Viagens: ', e);
    }
  }
  
  
  
  
  
  

  signOut() {
    this.authService.signOut()
    .then(() => {
      this.router.navigateByUrl('/')
    })
    .catch((error) => {
      console.log('Error occurred during sign-out:', error);
    })
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
