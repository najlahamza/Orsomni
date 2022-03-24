import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import {Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, } from '@angular/fire/auth';

@Injectable()

export class AuthService {
 
  userData: any;

 constructor(
  public afs: AngularFirestore, // Inject Firestore service
  public afAuth: AngularFireAuth, // Inject Firebase auth service
  public router: Router, 
  public ngZone: NgZone,
  private auth: Auth) {
  this.afAuth.authState.subscribe((user) => {
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user')!);
    } else {
      localStorage.setItem('user', 'null');
      JSON.parse(localStorage.getItem('user')!);
    }
  });
}

LogIn(email: string, password: string) {
  return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
    })
    .catch((error) => {
      window.alert(error.message);
    });
}
// Sign up with email/password
SignUp(email: string, password: string) {
  return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign 
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user);
    })
    .catch((error) => {
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

SetUserData(user: any) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    `users/${user.uid}`
  );
  const userData: User = {
    uid: user.uid,
    email: user.email,
    username: user.username,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
  return userRef.set(userData, {
    merge: true,
  });
}

 /*
 login(email: string, password: string) {
  return signInWithEmailAndPassword(this.auth, email, password);
}

register(email: string, password: string) {
  return createUserWithEmailAndPassword(this.auth, email, password);
}*/
 
 logOut() {
  return this.afAuth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  });
}
}