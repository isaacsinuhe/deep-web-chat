import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../components/dashboard/dashboard.component'
import { SettingsComponent } from '../../components/settings/settings.component'
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component'
import { SearchComponent } from '../../components/search/search.component'

const routes: Routes = [
  { 
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'contacts', component: SettingsComponent },
      { path: '', redirectTo: 'contacts', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { path: 'convos', component: PageNotFoundComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
