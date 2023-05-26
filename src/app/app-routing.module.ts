import { NgModule, Component } from '@angular/core';
import { CarrosComponent } from './carros/carros.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'carros', component : CarrosComponent},
  {path: 'home', component : HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
