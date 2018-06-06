import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';

import { Artist } from '../../models/artist';
import { Album } from '../../models/album';

import { ArtistService } from '../../services/artist.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-album-add',
	templateUrl: './album-add.component.html',
	providers:[ArtistService, UserService]
})
export class AlbumAddComponent implements OnInit {
	public title:string;
	public artist:Artist;
	public album:Album;
	public identity;
	public token;
	public url:string;
	public alertMessage;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private artistService: ArtistService,
		) { 
		this.title = 'Crear nuevo album';
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
		this.album = new Album('','',2017,'','');

	}

	ngOnInit() {
		console.log('album-add.component.html cargado')
	}

	public onSubmit(){
		this.route.params.forEach((params:Params)=>{
			let artistId= params['artist'];
			this.album.artist = artistId;
		});

		console.log(this.album);
	}

}
