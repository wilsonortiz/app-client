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
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { AlbumAddComponent } from './components/album-add/album-add.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { SongAddComponent } from './components/song-add/song-add.component';
import { SongEditComponent } from './components/song-edit/song-edit.component';

@NgModule({
  declarations: [
  AppHome,
  UserEditComponent,
  ArtistListComponent,
  WelcomeComponent,
  ArtistAddComponent,
  ArtistEditComponent,
  ArtistDetailComponent,
  AlbumAddComponent,
  AlbumEditComponent,
  AlbumDetailComponent,
  SongAddComponent,
  SongEditComponent
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
