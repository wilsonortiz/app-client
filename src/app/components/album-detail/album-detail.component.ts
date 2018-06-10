import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';

import { Album } from '../../models/album';

import { GLOBAL } from '../../services/global';

import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';

@Component({
	selector: 'app-album-detail',
	templateUrl: './album-detail.component.html',
	providers: [UserService, AlbumService]
})
export class AlbumDetailComponent implements OnInit {
	public title:string;
	public album :Album;
	public identity;
	public token;
	public url:string;
	public alertMessage:string;
	public confirmado;
	
	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private userService : UserService,
		private albumService: AlbumService) { 

		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;

		this.title='';
	}

	ngOnInit() {
		this.getAlbum();
		//Sacar album de la BD
	}

	public getAlbum(){
		this.route.params.forEach((params:Params)=>{
			let id= params['id'];

			this.albumService.getAlbum(this.token, id).subscribe(
				res=>{
					debugger;
					if(!res.albumStored){
						this.router.navigate(['/']);

					}else{
						this.album= res.albumStored;

/*
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
						}*/
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
