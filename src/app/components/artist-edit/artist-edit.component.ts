import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';

import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';


@Component({
	selector: 'app-artist-edit',
	templateUrl: '../artist-add/artist-add.component.html'
})
export class ArtistEditComponent implements OnInit {
	public title:string;
	public artist :Artist;
	public identity;
	public token;
	public url:string;
	public alertMessage:string;
	public is_edit;

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private userService : UserService,
		private artistService : ArtistService
		){

		this.title ='Crear nuevo artista';
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
		this.artist = new Artist('','','');
		this.is_edit=true;
	}


	ngOnInit() {

	}

}
