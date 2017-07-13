import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  constructor() { }
  
  visibleImages = [];

  getImages(){
  	return this.visibleImages = IMAGES.slice(0);
  }

  // getImages(id: number){
  // 	return IMAGES.slice(0).find(image => image.id == id);
  // }

}


const IMAGES = [
	{"id": 1, "caption": "Grassland Deer", "url": "assets/img/deer.jpg"},
	{"id": 2, "caption": "A lonely Road", "url": "assets/img/road.jpg"},
	{"id": 3, "caption": "Mountain Top", "url": "assets/img/mountain.jpg"},

];