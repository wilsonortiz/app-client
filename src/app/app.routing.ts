import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './components/user-edit/user-edit.component';

import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';

import { WelcomeComponent } from './components/welcome/welcome.component';



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
	path: 'mis-datos', component: UserEditComponent
},
{
	path: '**', component: WelcomeComponent
}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
