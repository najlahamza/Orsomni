import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardpending',
  templateUrl: './cardpending.component.html',
  styleUrls: ['./cardpending.component.css']
})
export class CardpendingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onAccept(){
    window.alert("You accepted Najla's Request \n here is the contact : \n 28154896 - najla@gmail.com")
  }

  onDecline(){
    window.alert("You declined Najla's Request ")
  }
}
