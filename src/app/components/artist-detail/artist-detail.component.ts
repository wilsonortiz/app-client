import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';

import { Artist } from '../../models/artist';
import { Album } from '../../models/album';

import { GLOBAL } from '../../services/global';

import { ArtistService } from '../../services/artist.service';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';

@Component({
	selector: 'app-artist-detail',
	templateUrl: './artist-detail.component.html',
	providers:[UserService, ArtistService, AlbumService]
})
export class ArtistDetailComponent implements OnInit {
	public artist :Artist;
	public albums :Album[];
	public identity;
	public token;
	public url:string;
	public alertMessage:string;

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private userService : UserService,
		private artistService: ArtistService,
		private albumService: AlbumService
		){
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.getArtist();
	}

	public getArtist(){
		this.route.params.forEach((params:Params)=>{
			let id= params['id'];
			console.log('id: '+id);

			this.artistService.getArtist(this.token,id).subscribe(
				res=>{
					
					if(!res.artist){
						this.router.navigate(['/']);

					}else{
						this.artist= res.artist;

						//Sacar los albun del artista
						this.albumService.getAlbums(this.token, res.artist._id).subscribe(
							res=>{
								
								if(!res.albums){
									this.alertMessage= 'Este artista no posee albums';
								}else{
									this.albums = res.albums;
								}

							},
							err =>{
								var errorMessage = <any>err;

								if(errorMessage!=null){
									var body = JSON.parse(err._body);
									
									console.log(err);
								}
							});
					}

				},
				err =>{
					var errorMessage = <any>err;

					if(errorMessage!=null){
						var body = JSON.parse(err._body);
						//this.alertMessage= body.message;
						console.log(err);
					}
				}
				);
		});
	}
}