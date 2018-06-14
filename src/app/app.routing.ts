import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './components/user-edit/user-edit.component';

import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';

import { WelcomeComponent } from './components/welcome/welcome.component';

import { AlbumAddComponent } from './components/album-add/album-add.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';

import { SongAddComponent } from './components/song-add/song-add.component';
import { SongEditComponent } from './components/song-edit/song-edit.component';


const appRoutes: Routes = [
{
	path: '', component: WelcomeComponent
},
{
	path: 'artistas/:page', component: ArtistListComponent
},
{
	path: 'crear-artista', component: ArtistAddComponent
},
{
	path: 'editar-artista/:id', component: ArtistEditComponent
},
{
	path: 'artista/:id', component: ArtistDetailComponent
},
{
	path: 'crear-album/:artist', component: AlbumAddComponent
},
{
	path: 'editar-album/:id', component: AlbumEditComponent
},
{
	path: 'album/:id', component: AlbumDetailComponent
},
{
	path: 'crear-tema/:album', component: SongAddComponent
},
{
	path: 'editar-tema/:id', component: SongEditComponent
},
{
	path: 'mis-datos', component: UserEditComponent
},
{
	path: '**', component: WelcomeComponent
}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
