import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PltformsComponent } from './platforms/pltforms.component';
import { PlatformViewComponent } from './platforms/platform-view/platform-view.component';

const routes: Routes = [
  { path: 'platforms', component: PltformsComponent },
  { path: 'platforms/:platfromName/platform-view', component: PlatformViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
