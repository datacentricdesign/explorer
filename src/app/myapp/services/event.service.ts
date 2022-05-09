import { Injectable } from "@angular/core";
import { filter, Observable, Subject } from "rxjs";
import { AppEvent, AppEventType } from "./app.event.class";

@Injectable()
export class EventService {

  private eventBrocker = new Subject<AppEvent<any>>();

  on(eventType: AppEventType): Observable<AppEvent<any>> {
    return this.eventBrocker.pipe(filter(event => event.type === eventType));
  }

  dispatch<T>(event: AppEvent<T>): void {
    this.eventBrocker.next(event);
  }

}