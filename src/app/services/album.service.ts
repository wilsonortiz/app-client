import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { GLOBAL } from './global';

import { Album } from '../models/album';

@Injectable({
	providedIn: 'root'
})
export class AlbumService {
	public url:string;

	constructor(private http:Http) {
		this.url = GLOBAL.url;
	}


	public addAlbum(token, album:Album){
		
		let body = JSON.stringify(album);
		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});
		let options = new RequestOptions({headers:headers});


		return this.http.post(this.url+'album', body, options).
		pipe(map((res:Response) => res.json()));
	}

	public updateAlbum(token, id:string, album:Album){
		
		let body = JSON.stringify(album);
		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});
		let options = new RequestOptions({headers:headers});


		return this.http.put(this.url+'album/'+ id, body, options).
		pipe(map((res:Response) => res.json()));
	}

	public getAlbum(token,id:string){

		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers:headers});

		return this.http.get(this.url +'album/'+ id, options).
		pipe(map((res:Response) =>res.json()));

	}

}
