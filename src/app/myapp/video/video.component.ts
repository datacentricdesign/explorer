import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { BucketService } from '../services/bucket.service';
import { EventService } from '../services/event.service';
import { AppEventType } from '../services/app.event.class';
import { Property, ValueOptions } from '@datacentricdesign/types';


@Component({
    selector: 'app-video-cmp',
    moduleId: module.id,
    templateUrl: 'video.component.html'
})
export class VideoComponent implements OnInit {

    @Input() propertyId: string;
    @Input() thingId: string;

    private property: Property;
    private valueOptions: ValueOptions;
    public src: ''

    public medias = []

    constructor(private route: ActivatedRoute,
        private bucketService: BucketService,
        private eventService: EventService) {
    }

    static arrayColumn = (arr, n) => arr.map(x => x[n]);
    static arrayColumnDate = (arr, n) => arr.map(x => new Date(x[n]));

    async ngOnInit() {
        this.eventService.on(AppEventType.ChangedTimeRange)
            .subscribe(event => this.handleChangedTimeRange(event.payload));
    }

    async handleChangedTimeRange(options: ValueOptions) {
        this.valueOptions = options;
        this.loadData();
    }

    private async loadData() {
        this.property = await this.bucketService.getPropertyValues(this.thingId, this.propertyId, this.valueOptions)
        console.log(this.property)
        for (let i=0;i<this.property.values.length;i++) {
            this.bucketService.getPropertyMedia(this.thingId, this.propertyId, 'video-mp4', this.property.values[i][0] as number, 'video/mp4').subscribe( blob => {
               this.medias.push(URL.createObjectURL(blob))
            })
        }
    }

}
