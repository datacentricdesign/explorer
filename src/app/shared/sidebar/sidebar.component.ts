import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BucketService } from 'app/myapp/services/bucket.service';
import { PropertyType, Thing } from '@datacentricdesign/types';
import { EventService } from 'app/myapp/services/event.service';
import { AppEvent, AppEventType } from 'app/myapp/services/app.event.class';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [];

@Component({
    moduleId: module.id,
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    serviceSubscription: any

    public things$: Observable<Thing[]>
    public things: Thing[]

    constructor(private bucketService: BucketService, private eventService: EventService) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.things$ = this.bucketService.find().pipe(
            map((data: Thing[]) => {
                this.things = data
                return this.things;
            }), catchError(error => {
                return throwError('Types not found!');
            })
        )
    }

    selectThing(thingId:string) {
        this.eventService.dispatch(new AppEvent(AppEventType.SelectedThing, thingId));
      }
}
