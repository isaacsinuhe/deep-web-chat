import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../components/dashboard/dashboard.component'
import { SettingsComponent } from '../../components/settings/settings.component'
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component'

const routes: Routes = [
  { 
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'single', component: SettingsComponent },
      { path: '', redirectTo: 'single', pathMatch: 'full' },
      { path: 'group', component: PageNotFoundComponent },
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
