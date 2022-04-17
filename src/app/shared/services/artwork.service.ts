import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Artwork } from './artwork';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ArtworkService {

    private dbPath = 'Artwork';
    artworksRef: AngularFirestoreCollection<Artwork> ;
   // artworks : Observable<Artwork[]> ;
    
    constructor(private fbauth:AngularFireAuth , public firestore: AngularFirestore) {
     // this.artworks=this.firestore.collection('Artwork').valueChanges();
      this.artworksRef = firestore.collection(this.dbPath);
    }

    async createAtrwork(data: Artwork){
        const user=await this.fbauth.currentUser;
        return this.firestore.collection('Artwork').add({...data, uid:user?.uid })
    }
    
     
    getAll(): AngularFirestoreCollection<Artwork> {
      return this.artworksRef;
    }
    
    create(artwork: Artwork): any {
      return this.artworksRef.add({ ...artwork });
    }
    
    update(id: string, data: any): Promise<void> {
      return this.artworksRef.doc(id).update(data);
    }
    
    delete(id: string): Promise<void> {
      return this.artworksRef.doc(id).delete();
    }
  }