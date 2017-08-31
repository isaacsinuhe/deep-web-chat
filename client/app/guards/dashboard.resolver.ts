import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from './../services/session.service';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class DashboardResolve implements Resolve<any> {

    constructor(private ss: SessionService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.ss.initSessionState()
    }
}