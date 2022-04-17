import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;  

  user$:Observable<User| null | undefined>;

  constructor(
    public afs: AngularFirestore,  
    public afAuth: AngularFireAuth,  
    public router: Router,
    public ngZone: NgZone  
  ) {

    this.user$=this.afAuth.authState.pipe(
      switchMap(user => {
          if(user){
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          }else{
            return of(null);
          }
      })
    );
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.afs.doc<User>(`Users/${user.uid}`).valueChanges();
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

   createUserFirestore(user: any){
    return this.afs.collection('Users').add({...user})
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          window.alert('You are logged in successfully !');
          this.router.navigate(['/dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
      window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, nom:string, prenom: string, tel: string,) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => { 
        this.SendVerificationMail();
        console.log(result.user)
        this.createUser(result.user,password,nom,prenom,tel);
        this.createUserFirestore(result.user);
        window.alert('account created successfully');
      })
      .catch((error) => {
        console.log(error)
        window.alert(error.message);
      });
  }

  

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  createUser(user:any, password:string, nom:string,prenom:string,tel:string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      password:password,
     // password:user.password,
      nom:nom,
      prenom:prenom,
      tel:tel,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
     // tel: user.tel,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  
  getCurrentUser(){
    return this.afAuth.currentUser;
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
