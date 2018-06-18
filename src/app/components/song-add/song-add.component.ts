import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';

import { Song } from '../../models/song';

import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song.service';

@Component({
	selector: 'app-song-add',
	templateUrl: './song-add.component.html',
	providers:[UserService, SongService]

})
export class SongAddComponent implements OnInit {
	public title:string;
	public song:Song;
	public identity;
	public token;
	public url:string;
	public alertMessage;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private songService: SongService
		) { 
		this.title = 'Crear nueva canción';
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
		this.song = new Song(1,'','','','');

	}

	ngOnInit() {
		console.log('song add');
	}

	public onSubmit(){
		this.route.params.forEach((params:Params)=>{
			let albumId= params['album'];
			this.song.album = albumId;
			
			this.songService.addSong(this.token, this.song).subscribe(
				response =>{
					debugger;
					if(!response.song){
						this.alertMessage ='Error en el servidor';

					}else{
						this.alertMessage ='La canción se ha agregado correctamente';
						this.song= response.song;

						this.router.navigate(['/editar-tema', response.song._id]);

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

}
