import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';

import { Album } from '../../models/album';
import { Song } from '../../models/song';

import { GLOBAL } from '../../services/global';

import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { SongService } from '../../services/song.service';

@Component({
	selector: 'app-album-detail',
	templateUrl: './album-detail.component.html',
	providers: [UserService, AlbumService, SongService]
})
export class AlbumDetailComponent implements OnInit {
	public title:string;
	public songs : Song[];
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
		private albumService: AlbumService,
		private songService: SongService) { 

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

					if(!res.albumStored){
						this.router.navigate(['/']);

					}else{
						this.album= res.albumStored;

						//Sacar los albun del artista
						this.songService.getSongs(this.token, res.albumStored._id).subscribe(
							res=>{
								
								if(!res.songs){
									this.alertMessage= 'Este album no posee canciones';
								}else{

									this.songs = res.songs;
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
						console.log(err);
					}
				}
				);
		});
	}

	public onDeleteConfirm(id){
		this.confirmado = id;
	}

	public onDeleteCancel(){
		this.confirmado = null;
	}

	public onDeleteSong(id){
		this.songService.deleteSong(this.token, id).subscribe(
			res => {

				if(!res.song){
					alert('Error en el servidor');

				}else{
					this.getAlbum();
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
	}

}
