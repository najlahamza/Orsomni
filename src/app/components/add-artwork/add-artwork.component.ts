import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/shared/services/artwork.service';
import { Artwork } from 'src/app/shared/services/artwork';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth } from 'firebase/auth';
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

  submitted = false;
  constructor(private ArtworkService: ArtworkService,public auth : AuthService) { }

  ngOnInit(): void {
  }

  addArtwork(): void {
    this.ArtworkService.createAtrwork(this.artwork).then(() => {
      console.log('Created new item successfully!');
    });
  }


}
