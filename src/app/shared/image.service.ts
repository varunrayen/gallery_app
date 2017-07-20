import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ImageService {

  constructor(private http:Http) { }
  
  visibleImages = [];

  private splashUrl = 'http://www.splashbase.co/api/v1/images/random';
  private galleryUrl = 'http://localhost:3000/api/gallery';

  getImages(){
  	// return this.visibleImages = IMAGES.slice(0);
     let data = localStorage.getItem('uname');
     return this.http.post(this.galleryUrl, {username: data})
     .map(res => res.json());
  }

  // getImages(id: number){
  // 	return IMAGES.slice(0).find(image => image.id == id);
  // }

  randomImage(){
    return this.http.get(this.splashUrl)
    .map(res => res.json());

  }

}


const IMAGES = [
	{"id": 1, "caption": "Grassland Deer", "url": "assets/img/deer.jpg"},
	{"id": 2, "caption": "A lonely Road", "url": "assets/img/road.jpg"},
	{"id": 3, "caption": "Mountain Top", "url": "assets/img/mountain.jpg"},

];