import { Component, OnInit } from '@angular/core';

import { ImageService } from '../shared/image.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

	title = 'Recent Photos';
	visibleImages: any[] = [];

  constructor(private imageService: ImageService) { 
  	this.visibleImages = this.imageService.getImages();
  }

  ngOnInit() {
  }

}
