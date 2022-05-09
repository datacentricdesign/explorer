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
import { NgChartsModule } from 'ng2-charts';
import { EventService } from './services/event.service';
import { LineChartComponent } from './linechart/linechart.component';
import { VideoComponent } from './video/video.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MyAppRouterModule,
    NgChartsModule
  ],
  declarations: [
    DashboardComponent,
    LineChartComponent,
    VideoComponent,
    ThingsComponent
  ],
  providers: [
    BucketService,
    EventService,
    ScriptService,
    {provide: SAVER, useFactory: getSaver}
  ],
})

export class MyAppModule { }
