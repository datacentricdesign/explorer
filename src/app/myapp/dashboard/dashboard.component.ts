import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BucketService } from '../services/bucket.service';
import 'chartjs-adapter-moment';
import Annotation from 'chartjs-plugin-annotation';

import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';
import { EventService } from '../services/event.service';
import { AppEventType } from '../services/app.event.class';
import { DOCUMENT } from '@angular/common';

Chart.register(Annotation, ChartStreaming);

// Change default options for ALL charts
Chart.defaults.set('plugins.streaming', {
    duration: 20000
});

@Component({
    selector: 'app-dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    public properties = []

    constructor(private route: ActivatedRoute,
        private bucketService: BucketService,
        private eventService: EventService,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document) {
    }

    async ngOnInit() {
        // look up the params
        this.route.queryParams
            .subscribe(params => {
                // Sometimes for simplicity you might decide to refresh
                // the whole page after an action you can use success/error
                // to keep the user informed via toast notification.
                if (params.success !== undefined) {
                    this.bucketService.toast(params.success, 'success')
                } else if (params.error !== undefined) {
                    this.bucketService.toast(params.error, 'danger')
                }
            }
            );

        this.eventService.on(AppEventType.SelectedThing)
            .subscribe(event => this.handleSelectedThing(event.payload));
    }

    async handleSelectedThing(thingId: string) {
        this.properties = await this.bucketService.getProperties(thingId);
    }

}
