import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyAppRouterModule } from './myapp.routes';

import { DashboardComponent } from './dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BucketService } from './services/bucket.service';
import { SAVER, getSaver } from './services/saver.provider';
import { ThingsComponent } from './things/things.component';
import { ScriptService } from './services/script.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MyAppRouterModule,
  ],
  declarations: [
    DashboardComponent,
    ThingsComponent
  ],
  providers: [
    BucketService,
    ScriptService,
    {provide: SAVER, useFactory: getSaver}
  ],
})

export class MyAppModule { }
