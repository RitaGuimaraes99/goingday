import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Local } from 'src/environments/local';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.page.html',
  styleUrls: ['./viagem.page.scss'],
})

export class ViagemPage implements OnInit {
  start_date: Date = new Date();
  end_date: Date = new Date();
  locais: Local[] = [];
  locaisProcurado: Local[] = [];
  search: string = '';
  supabase: SupabaseClient;
  isSearchbarOpen: boolean = false;
  selectedLocais: Local[] = [];
  data: any[] = [];
  isStartCalendarOpen: boolean = false;
  isEndCalendarOpen: boolean = false;

  title: string = '';

  notes: string = '';
  selectedCity: any;

  tableName: string = 'viagens';

  inputValues: { local: any; inputText: string }[] = [];

  @ViewChild('searchbar', { static: false }) searchbar!: IonSearchbar;

  constructor(private authService: AuthService, private storage: Storage, private alertController: AlertController, private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  ngOnInit() {
    this.storage.create();
    this.fetchLocais();
  }

  toggleSearchbar() {
    this.isSearchbarOpen = !this.isSearchbarOpen;
  }

  fetchLocais() {
    fetch('assets/data/locais.json')
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
        this.locais = data;
        this.locaisProcurado = data;
      });
  }

  ionViewDidEnter() {
    this.fetchLocais();
  }

  searchLocais() {
    if (this.search.trim() !== '') {
      this.locaisProcurado = this.locais.filter((local) =>
        this.isLocalNameMatch(local.name)
      );
    } else {
      this.locaisProcurado = this.locais;
    }
  }

  isLocalNameMatch(name: string): boolean {
    const searchTermLower = this.search.toLowerCase();
    const localNameLower = name.toLowerCase();
    return localNameLower.includes(searchTermLower);
  }

  clearSearchbar() {
    this.search = '';
    this.locaisProcurado = this.locais;
    this.searchbar.setFocus(); // Set focus back to search bar
  }

  openStartCalendar() {
    this.isStartCalendarOpen = true;
  }

  openEndCalendar() {
    this.isEndCalendarOpen = true;
  }

  saveData(local: any) {
    this.selectedCity = local;
    this.search = '';
    this.isSearchbarOpen = false; // Close the search bar after selecting a city
    this.selectedLocais.push(local);
  }

  async saveAllData() {
    const userId = this.authService.getCurrentUserId();

    // verificar se existem locais selecionados
    if (this.selectedLocais.length === 0) {
      throw new Error('No city selected.');
    }

    try {
      const viagem = {
        user_id: userId,
        title: this.title,
        start_date: this.start_date,
        end_date: this.end_date,
        notes: this.notes,
        locais: this.selectedLocais,
        created_at: new Date().toISOString(),
      };

      await this.supabase
        .from('viagens')
        .insert(viagem)
        .then(() => {
          this.showAlert('Sucess', 'Trip Created');
          console.log('Viagem saved successfully.');
          this.storage.remove('locaisProcurado');
          this.router.navigate(['/folder/home']);
        });
    } catch (e) {
      this.showAlert('Failed', 'Try again');
      console.error('Error saving Trip: ', e);
    }
  }

  onStartDateChange() {
    console.log('Selected Start Date:', this.start_date);
  }

  onEndDateChange() {
    console.log('Selected End Date:', this.end_date);
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

