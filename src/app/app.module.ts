import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppHome } from './components/home/app.home.component';
import { HttpModule } from "@angular/http";
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { routing, appRoutingProviders } from './app.routing';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';

@NgModule({
  declarations: [
  AppHome,
  UserEditComponent,
  ArtistListComponent,
  WelcomeComponent,
  ArtistAddComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppHome]
})
export class AppModule { }
