import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AlertModule } from 'ngx-bootstrap';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageComponent } from './image/image.component';

import { ImageService } from './shared/image.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    GalleryComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot()
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
