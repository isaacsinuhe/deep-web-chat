import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from './../services/session.service';
import { SocketService } from './../services/socket.service';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class DashboardResolve implements Resolve<any> {

    constructor(private session: SessionService, private socket: SocketService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.session.initSessionState()
    }
}