'use strict';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';

import { Album } from '../../models/album';

import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { UploadService } from '../../services/upload.service';

@Component({
	selector: 'app-album-edit',
	templateUrl: '../album-add/album-add.component.html',
	providers:[UserService, AlbumService, UploadService]
})
export class AlbumEditComponent implements OnInit {
	public title:string;
	public album:Album;
	public identity;
	public token;
	public url:string;
	public alertMessage;
	public isEdit;
	public filesToUpload:Array<File>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private albumService: AlbumService,
		private uploadService: UploadService

		) { 
		this.title = 'Editar album';
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
		this.album = new Album('','',2017,'','');
		this.isEdit = true;

	}

	ngOnInit() {
		console.log('album-edit.component.html cargado');

			//Conseguir el album
			this.getAlbum();
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
		}

		public onSubmit(){
			this.route.params.forEach((params:Params)=>{
				let id= params['id'];

				this.albumService.updateAlbum(this.token, id, this.album).subscribe(
					res=>{

						if(!res.albumUpdate){
							this.alertMessage='Error en el servidor';

						}else{

							this.alertMessage='El album se ha actualizado correctamente';

							if(!this.filesToUpload){
								//redirigir
								if(res.albumUpdate.artist != null){
									this.router.navigate(['/artista', res.albumUpdate.artist]);
								}else{
									this.router.navigate(['/albums', 1]);
								}

							}else{
								//Subir imagen del album
								this.uploadService.makeFilesRequest(this.url+'upload-image-album/'+id, [], this.filesToUpload, this.token, 'image')
								.then(
									(result) =>{
										if(res.albumUpdate.artist != null){
											this.router.navigate(['/artista', res.albumUpdate.artist]);
										}else{
											this.router.navigate(['/albums', 1]);
										}

									},
									(err) =>{
										console.log(err);
									}
									);
							}
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

		}

		public fileChangeEvent(fileInput:any){
			this.filesToUpload= <Array<File>>fileInput.target.files;
		}
	}
