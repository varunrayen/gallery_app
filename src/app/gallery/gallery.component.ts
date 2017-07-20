import { Component, OnInit } from '@angular/core';

import { ImageService } from '../shared/image.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

	title = 'Recent Photos';
  currentUser = localStorage.getItem('uname');
	visibleImages: any[];

  constructor(private imageService: ImageService) { 
  	this.imageService.getImages()
    .subscribe(images => {
      this.visibleImages = images;
    });
  }

  ngOnInit() {
  }

}
