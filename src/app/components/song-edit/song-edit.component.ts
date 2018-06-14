import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';

import { Song } from '../../models/song';

import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song.service';
import { UploadService } from '../../services/upload.service';

@Component({
	selector: 'app-song-edit',
	templateUrl: '../song-add/song-add.component.html',
	providers: [UserService, SongService, UploadService ]
})
export class SongEditComponent implements OnInit {
	public title:string;
	public song:Song;
	public identity;
	public token;
	public url:string;
	public alertMessage;
	public is_edit;
	public filesToUpload;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private songService: SongService,
		private uploadService: UploadService
		) { 
		this.title = 'editar canción';
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
		this.song = new Song(1,'','','','');
		this.is_edit= true;

	}

	ngOnInit() {
		console.log('song edit');

		//sacar la canción a editar
		this.getSong();
	}

	public onSubmit(){
		this.route.params.forEach((params:Params)=>{
			let songId = params['id'];
			
			this.songService.updateSong(this.token, songId, this.song).subscribe(
				response =>{

					if(!response.song){
						this.alertMessage ='Error en el servidor';

					}else{
						this.alertMessage ='La canción se ha actualizado correctamente';

						if(!this.filesToUpload){
							this.router.navigate(['/album', res.song.album]);

						}else{

						//subir el fichero de audio
						this.uploadService.makeFilesRequest(this.url+'upload-file-song/'+ songId, [], this.filesToUpload, this.token, 'file')
						.then(
							(result) =>{

								this.router.navigate(['/album', res.song.album]);
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
					console.log(err);
				}
			});
		});
	}

	public getSong(){
		this.route.params.forEach((params:Params)=>{
			let songId = params['id'];

			this.songService.getSong(this.token, songId).subscribe(
				res =>{

					if(!res.song){
						this.router.navigate(['/']);

					}else{

						this.song = res.song;
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

	public fileChangeEvent(fileInput:any){
		this.filesToUpload=<Array<File>>fileInput.target.files;
	}

}
