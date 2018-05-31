import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { GLOBAL } from './global';

import { Artist } from '../models/artist';

@Injectable({
	providedIn: 'root'
})
export class UploadService {
	public url:string;

	constructor(private http:Http) {
		this.url = GLOBAL.url;
	}


	public makeFilesRequest(url: string, params: Array<string>, files: Array<File>, token:string,name:string) {
		
		return new Promise(function(resolve, reject) {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			if(files!=null){

				for (var i = 0; i < files.length; i++) {
					formData.append(name, files[i], files[i].name);
				}

				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							resolve(JSON.parse(xhr.response));

						} else {
							reject(xhr.response);
						}
					}
				}
				xhr.open('POST', url, true);
				xhr.setRequestHeader('Authorization', token);
				xhr.send(formData);
			}
		});
	}

}