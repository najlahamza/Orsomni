import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;// Observable<User>;
 
 constructor(private angularFireAuth: AngularFireAuth) {
 this.userData = angularFireAuth.authState;
 }
 
 
 /* Sign up */
 SignUp(email: string, password: string) {
 this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
 console.log('You are Successfully signed up!', res);
 })
 .catch(error => {
 console.log('Something is wrong:', error.message);
 });
 }
 
 /* Sign in */
 SignIn(email: string, password: string) {
 this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
 console.log('You are in!');
 })
 .catch(err => {
 console.log('Something went wrong:',err.message);
 });
 }
 
 /* Sign out */
 SignOut() {
 this.angularFireAuth.signOut();
}
}