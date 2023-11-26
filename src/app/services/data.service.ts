import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Viagem } from './database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
   }

  async getViagens(): Promise<Viagem[]> {
    const { data, error } = await this.supabase
      .from('viagens')
      .select('*')
      .order('start_date', { ascending: false });
  
    if (error) {
      return [];
    }
  
    return data as Viagem[];
  }

  async getViagemById(id: number): Promise<Viagem> {
    const { data, error } = await this.supabase
      .from('viagens')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Viagem;
  }

  async insertViagem(viagem: Viagem) {
    const { data, error } = await this.supabase
      .from('viagens')
      .insert(viagem)
      .single();
  
    if (error) {
      return null;
    }
    return data;
  }
  
  async updateViagem(viagem: Viagem): Promise<void> {
    const { data, error } = await this.supabase
      .from('viagens')
      .update({
        name: viagem.name,
        start_date: viagem.start_date,
        end_date: viagem.end_date,
        notes: viagem.notes,
        locais: viagem.locais,
        pontos_interesse: viagem.pontos_interesse
      })
      .eq('id', viagem.id);

    if (error) {
      console.error(error);
      throw new Error('Erro ao atualizar viagem');
    }
  }
  
  async deleteViagem(id: number): Promise<void> {
    await this.supabase.from('viagens').delete().eq('id', id);
  }  

}

