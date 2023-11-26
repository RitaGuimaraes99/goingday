import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Viagem } from 'src/app/services/database';
import { environment } from 'src/environments/environment';
import { Local } from 'src/environments/local';

@Component({
  selector: 'app-viagens-criadas',
  templateUrl: './viagens-criadas.page.html',
  styleUrls: ['./viagens-criadas.page.scss'],
})
export class ViagensCriadasPage {
  
}


