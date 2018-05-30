import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './components/user-edit/user-edit.component';

import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';

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
	path: 'mis-datos', component: UserEditComponent
},
{
	path: '**', component: WelcomeComponent
}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
