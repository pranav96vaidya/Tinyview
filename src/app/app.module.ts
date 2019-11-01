import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PanelComponent } from './panel/panel.component';
import { ComicComponent } from './comic/comic.component';
import { FooterComponent } from './footer/footer.component';
import { ImageComponent } from './image/image.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { Reducer } from './redux/reducer';
import { LazyLoadDirective } from './directive/lazy-load.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PanelComponent,
    ComicComponent,
    FooterComponent,
    ImageComponent,
    LazyLoadDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({
      post: Reducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
