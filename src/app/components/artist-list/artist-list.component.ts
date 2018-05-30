import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'app-artist-list',
	templateUrl: './artist-list.component.html',
	providers: [UserService]
})
export class ArtistListComponent implements OnInit {
	public title :string;
	public artists :Artist[];
	public identity;
	public token;
	public url:string;

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private userService : UserService
		){

		this.title='Artistas'
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;

	}

	ngOnInit() {
		console.log('artist-list-component cargado');

		//Cargar el listado de artistas cuando se inicie la pagina
	}

}
