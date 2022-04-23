import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Thing } from '@datacentricdesign/types';
import { catchError, map } from 'rxjs/operators';
import { AppService } from 'app/app.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { BucketService } from 'app/myapp/services/bucket.service';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

const dashboardRoute = { path: '/dashboard', title: 'Dashboard', icon: 'nc-layout-11', class: '' }

export const ROUTES: RouteInfo[] = [dashboardRoute];

@Component({
    moduleId: module.id,
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    serviceSubscription: any

    constructor(private bucketService: BucketService) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
