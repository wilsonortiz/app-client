import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';

import { Artist } from '../../models/artist';
import { Album } from '../../models/album';

import { ArtistService } from '../../services/artist.service';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';

@Component({
	selector: 'app-album-add',
	templateUrl: './album-add.component.html',
	providers:[ArtistService, UserService, AlbumService]
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
		private albumService: AlbumService,

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

			this.albumService.addAlbum(this.token, this.album).subscribe(
				res=>{

					if(!res.album){
						this.alertMessage='Error en el servidor';

					}else{
						this.alertMessage='El album se ha creado correctamente';
						this.album= res.album;
						this.router.navigate(['/editar-album', res.album._id]);
					}

				},
				err =>{
					var errorMessage = <any>err;

					if(errorMessage!=null){
						var body = JSON.parse(err._body);
						this.alertMessage= body.message;
						console.log(err);
					}
				}


				);
		});

		console.log(this.album);
	}

}
