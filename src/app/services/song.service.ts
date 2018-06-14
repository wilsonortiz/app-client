import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { GLOBAL } from './global';

import { Song } from '../models/song';

@Injectable({
	providedIn: 'root'
})
export class SongService {
	public url:string;

	constructor(private http:Http) {
		this.url = GLOBAL.url;
	}

	public addSong(token, song:Song){
		
		let body = JSON.stringify(song);
		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});
		let options = new RequestOptions({headers:headers});

		return this.http.post(this.url+'song', body, options).
		pipe(map((res:Response) => res.json()));
	}

	public updateSong(token, idSong, song:Song){
		
		let body = JSON.stringify(song);
		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});
		let options = new RequestOptions({headers:headers});

		return this.http.put(this.url+'song/'+ idSong, body, options).
		pipe(map((res:Response) => res.json()));
	}

	public getSong(token, idSong){
		
		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});
		let options = new RequestOptions({headers:headers});

		return this.http.get(this.url+'song/'+ idSong, options).
		pipe(map((res:Response) => res.json()));

	}
}