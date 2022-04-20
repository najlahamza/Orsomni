import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/shared/services/artwork.service';
import { Artwork } from 'src/app/shared/services/artwork';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-artwork',
  templateUrl: './add-artwork.component.html',
  styleUrls: ['./add-artwork.component.css']
})
export class AddArtworkComponent implements OnInit {
 
  artwork: Artwork ={
    title:"",
    type: "",
    price: 0,
    photo: "",
    desc: "" };

    imageError: string |null;
    isImageSaved: boolean;
    cardImageBase64: string;

  submitted = false;
  constructor(private ArtworkService: ArtworkService,public auth : AuthService, public firestore: AngularFirestore) {
    this.imageError="";
    this.isImageSaved=false;
    this.cardImageBase64="";

   }

  ngOnInit(): void {
  }

  fileChangeEvent(fileInput: any) {
   
    /*var storageRef = this.firestore.ref().child("Whatever your path is in Firebase Storage");
    var imageRef = "Your path in the Realtime Database";
    
        storageRef.getDownloadURL().then(function(url) {
            imageRef.child("image").set(url);
        }); 
    
        var task = storageRef.putString("Your base64 string substring variable", 'base64').then(function(snapshot) {
             console.log('Uploaded a base64 string!');
             });*/
}

    types : string[] = ['Digital','Pencil']

   getBase64(event: any) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  addArtwork(): void {
    this.ArtworkService.create(this.artwork).then(() => {

      window.alert('Added new Artwork successfully!');
    })
    .catch((error: any) => {
      window.alert(error);
    });
  }


}
