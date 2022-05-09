import { Component, OnInit } from '@angular/core';
import { BucketService } from 'app/myapp/services/bucket.service';
import { catchError, map } from 'rxjs/operators';

import { Thing } from '@datacentricdesign/types';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html'
})
export class ThingsComponent implements OnInit {

  public things$: Observable<Thing[]>
  public things: Thing[]

  constructor(private bucketService: BucketService) {

  }

  ngOnInit() {
    this.things$ = this.bucketService.find().pipe(
      map((data: Thing[]) => {
        this.things = data
        return this.things;
      }), catchError(error => {
        return throwError('Types not found!');
      })
    )
  }


}
