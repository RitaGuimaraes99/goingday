import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
   }

   signUp(credentials: {email: string; password: string}) {
    return this.supabase.auth.signUp(credentials);
   }

   signIn(credentials: {email: string, password: string}) {
    return this.supabase.auth.signInWithPassword(credentials);
   }

   sendPasswordReset(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email);
   }

   async signOut() {
    await this.supabase.auth.signOut();
    //this.router.navigateByUrl('/', { replaceUrl: true });
   }
}
