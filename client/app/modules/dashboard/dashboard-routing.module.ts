import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../../components/dashboard/dashboard.component'
import { SettingsComponent } from '../../components/settings/settings.component'
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component'
import { SearchComponent } from '../../components/search/search.component'
import { ConvoListComponent } from '../../components/convo-list/convo-list.component'
import { ContactListComponent } from '../../components/contact-list/contact-list.component'
import { NotificationListComponent } from '../../components/notification-list/notification-list.component';
import { DashboardGuard } from '../../guards/dashboard.guard'

const routes: Routes = [
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    canActivateChild: [DashboardGuard],
    children: [
      { path: 'convos', component: ConvoListComponent },
      { path: 'contacts', component: ContactListComponent },
      { path: 'notifs', component: NotificationListComponent },
      { path: '', redirectTo: 'convos', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class DashboardRoutingModule { }
