import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/services/user';
import {AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Artwork } from 'src/app/shared/services/artwork';
import { ArtworkService } from 'src/app/shared/services/artwork.service';
import { Router } from '@angular/router';

//import { collection, doc, setDoc } from "firebase/firestore"; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

arts :any[];

  artwork: Artwork =
    {artid: "",
    desc: "",
    type: "",
    price: 0,
    photo: "", } ;

   
    
   users: User[] = [
    { uid: "11", username: "Dr Nice",emailVerified:true ,photoURL:"",email:"user@gmail.com" ,nom:"111",prenom:"dddd",password:"000"},
    { uid: "12", username: "Dr Nice",emailVerified:true ,photoURL:"",email:"user@gmail.com" ,nom:"111",prenom:"dddd",password:"000"},
    { uid: "13", username: "Dr Nice",emailVerified:true ,photoURL:"",email:"user@gmail.com" ,nom:"111",prenom:"dddd",password:"000"},
    { uid: "14", username: "Dr Nice",emailVerified:true ,photoURL:"",email:"user@gmail.com" ,nom:"111",prenom:"dddd",password:"000"},
    { uid: "15", username: "Dr Nice",emailVerified:true ,photoURL:"",email:"user@gmail.com" ,nom:"111",prenom:"dddd",password:"000"},
   
  ];

  successMsg = 'Data successfully saved.';

artworkRef: AngularFirestoreCollection<Artwork>;
 
  constructor(public authService: AuthService, private firestore: AngularFirestore, public artservice: ArtworkService, public router: Router) {
    this.artworkRef = this.firestore.collection<Artwork>('Artwork');
    this.arts= [];
    //artwork: new AngularFirestoreDocument<any>();
    //this.artwork = db.doc('tutorial');

  }


  save() {
    this.artworkRef.add(this.artwork).then( _ => alert(this.successMsg)); 
    }

  ngOnInit(): void {
    this.firestore.collection('Artwork').get().subscribe(querysnapshot => {
        console.log();
        this.arts = querysnapshot.docs.map(doc => doc.data());
    } );
    console.log(this.arts.length);
  }
}
