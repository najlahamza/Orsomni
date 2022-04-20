import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AddArtworkComponent } from './components/add-artwork/add-artwork.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArtCardsComponent } from './components/art-cards/art-cards.component';
import { ContactComponent } from './components/contact/contact.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ViewArtComponent } from './components/view-art/view-art.component';
import { CardrequestComponent } from './components/cardrequest/cardrequest.component';

// route guard
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'add-artwork', component: AddArtworkComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'artists', component: ArtistsComponent, canActivate: [AuthGuard] },
  { path: 'view-art', component: ViewArtComponent, canActivate: [AuthGuard] },
  { path: 'cardrequest', component: CardrequestComponent, canActivate: [AuthGuard] },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}