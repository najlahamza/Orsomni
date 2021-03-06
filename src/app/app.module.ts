import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
// components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AddArtworkComponent } from './components/add-artwork/add-artwork.component';

// routing
import { AppRoutingModule } from './app-routing.module';

// service
import { AuthService } from './shared/services/auth.service';
import { ArtworkService } from './shared/services/artwork.service';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewArtComponent } from './components/view-art/view-art.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArtCardsComponent } from './components/art-cards/art-cards.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ContactComponent } from './components/contact/contact.component';
import { CardrequestComponent } from './components/cardrequest/cardrequest.component';
import { CardpendingComponent } from './components/cardpending/cardpending.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AddArtworkComponent,
    ProfileComponent,
    NavbarComponent,
    ViewArtComponent,
    FooterComponent,
    ArtCardsComponent,
    ArtistsComponent,
    ContactComponent,
    CardrequestComponent,
    CardpendingComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
  ],
  providers: [AuthService, ArtworkService],
  bootstrap: [AppComponent],
})

export class AppModule {}