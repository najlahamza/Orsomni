import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/services/user';
import {AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Artwork } from 'src/app/shared/services/artwork';
import { ArtworkService } from 'src/app/shared/services/artwork.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { userInfo } from 'os';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userRef: any;
  public id:any;
  public user:any;

  constructor(public auth : AngularFireAuth ,public authService: AuthService, private firestore: AngularFirestore) { 
    this.userRef = firestore.collection('/Users');
    

    this.id="2JwcuGLiheXudCZNyO6oqaBQ0g02";
  }


  async getUser(){

    const snapshot =await this.userRef.where("uid","==","2JwcuGLiheXudCZNyO6oqaBQ0g02").get().then((doc: any) => {
      if (doc.exists) {
          this.user=doc.data()
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  });

  }

  ngOnInit(): void {

    //this.getUser();

    
    const { currentUser } = this.auth;
      console.log('Currently logged in user', currentUser);
     this.auth.onAuthStateChanged(function(user) {
      if (user) {

        console.log(user.uid)
        
       } else {
        console.log("nothing")
      }
    });


    var query = this.userRef.where('uid','==',this.id).get()
    .then((snapshot: { id: any; data: () => any; }[])  => {
        snapshot.forEach((doc: { id: any; data: () => any; }) => {

            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err: any) => {
        console.log('Error getting documents', err);
    });
    
    
  }



}
