import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/services/user';
import {AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Artwork } from 'src/app/shared/services/artwork';
import { ArtworkService } from 'src/app/shared/services/artwork.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-art-cards',
  templateUrl: './art-cards.component.html',
  styleUrls: ['./art-cards.component.css']
})
export class ArtCardsComponent implements OnInit {

  arts :any[];

  successMsg = 'Data successfully saved.';

  artwork: Artwork =
  {artid: "",
  desc: "",
  type: "",
  price: 0,
  photo: "", } ;

  artworkRef: AngularFirestoreCollection<Artwork>;
 
  constructor(public authService: AuthService, private firestore: AngularFirestore, public artservice: ArtworkService, public router: ActivatedRoute) {
    this.artworkRef = this.firestore.collection<Artwork>('Artwork');
    this.arts= []; 
    //artwork: new AngularFirestoreDocument<any>();
    //this.artwork = db.doc('tutorial');

  }

  save() {
    this.artworkRef.add(this.artwork).then( _ => alert(this.successMsg)); 
    }

  ngOnInit(): void {

   /*this.router.queryParams.pipe(params => {
      this.name = params['name'];
    });*/

    this.firestore.collection('Artwork').get().subscribe(querysnapshot => {
        console.log();
        this.arts = querysnapshot.docs.map(doc => doc.data());
    } );
    console.log(this.arts.length);
  }

  DeleteArtwork(id:string){
    this.artservice.deleteArtwork(id);
  }
  
}
