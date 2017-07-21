import { Component, OnInit } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

const URL = 'http://localhost:3000/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	public uploader:FileUploader = new FileUploader({url: URL});

  constructor() { }

  ngOnInit() {
  	var uo: FileUploaderOptions = {};
		uo.headers = [{ name: 'name', value : localStorage.getItem('uname') } ]
		this.uploader.setOptions(uo);
  }

}
