import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';

import { Album } from '../../models/album';
import { Song } from '../../models/song';

import { GLOBAL } from '../../services/global';

import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { SongService } from '../../services/song.service';

@Component({
	selector: 'app-player',
	template: `
	<div class="album_image">
	<span *ngIf="song.album">
	<img id="play-image-album" src="{{ url + 'get-image-album/' + song.album.image}}" />
	</span>

	<span *ngIf="!song.album">
	<img id="play-image-album" src="assets/images/default.jpg" />
	</span>
	</div>
	<div class = "audio_file">
	<p>Reproduciendo</p>
	<span id="play_song_title"> 
	{{song.name}}
	</span>
	<span id="play_song_artist"> 
	<span *ngIf="song.artist"></span>
	{{song.album.artist.name}}
	</span>
	<audio controls id="player">
	<source id="mp3_source" src"{{url + 'get-song-file/'+ song.file}} type="audio/mpeg" />
	Tu navegador no es compatible
	</audio>


	</div>

	`
})
export class PlayerComponent implements OnInit {

	public url:string;
	public song;

	constructor() {
		this.url= GLOBAL.url;
		this.song = new Song(1,"","","","");

	}

	ngOnInit() {

		console.log('player cargado');
	}

}
