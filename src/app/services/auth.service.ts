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
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  public authenticated$: Observable<boolean> = this.authenticatedSubject.asObservable();
  private currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject<boolean | User>(false);

  constructor(private router: Router) { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)

    this.supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED'){
        console.log('SET USER')
        if(sess && sess.user){
          this.currentUser.next(sess.user)
        }else{
          this.currentUser.next(false)
        }
      }else{
        this.currentUser.next(false)
      }
    })
    this.loadUser()
  }

  async loadUser(){
    if(this.currentUser.value){ return; } //user already set

    const user = await this.supabase.auth.getUser()

    if(user.data.user){
      this.currentUser.next(user.data.user)
    }else{
      this.currentUser.next(false)
    }
  }

   signUp(credentials: {email: string; password: string}) {
    return this.supabase.auth.signUp(credentials);
   }

   signIn(credentials: {email: string, password: string}) {
    this.authenticatedSubject.next(true); // é true quando o login é efetuado com sucesso
    return this.supabase.auth.signInWithPassword(credentials);
   }

   sendPasswordReset(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email);
   }

   async signOut() {
    await this.supabase.auth.signOut();
    this.authenticatedSubject.next(false); // é falso quando o user faz logout
    this.router.navigateByUrl('/', { replaceUrl: true });
   }

   getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable()
  }

  getCurrentUserId(): string | null {
    if (this.currentUser.value) {
      return (this.currentUser.value as User).id
    } else {
      return null
    }
  }

  updateEmail(newEmail: string) {
    const user: User | boolean = this.currentUser.value;

    if (user && typeof user !== 'boolean') {
      return this.supabase.auth.updateUser({
        email: newEmail,
      });
    }

    throw new Error('User is not authenticated');
  }

  updatePassword(newPassword: string) {
    const user: User | boolean = this.currentUser.value;

    if (user && typeof user !== 'boolean') {
      return this.supabase.auth.updateUser({
        password: newPassword,
      });
    }

    throw new Error('User is not authenticated');
  }
   
}
