import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicComponent } from './comic/comic.component';
import { PanelComponent } from './panel/panel.component';


const routes: Routes = [
  { path: '', component: PanelComponent },
  { path: '**', component: ComicComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
