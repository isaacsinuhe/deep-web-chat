import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Route } from '@angular/router'

import { HomeComponent } from '../../components/home/home.component'
import { SettingsComponent } from '../../components/settings/settings.component'
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component'

const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
