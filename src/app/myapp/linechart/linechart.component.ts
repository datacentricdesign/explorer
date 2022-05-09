import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { Property, ValueOptions } from '@datacentricdesign/types';

Chart.register(Annotation, ChartStreaming);

// Change default options for ALL charts
Chart.defaults.set('plugins.streaming', {
    duration: 20000
});

@Component({
    selector: 'app-linechart-cmp',
    moduleId: module.id,
    templateUrl: 'linechart.component.html'
})
export class LineChartComponent implements OnInit {

    @Input() propertyId: string;
    @Input() thingId: string;

    private property: Property;
    private valueOptions: ValueOptions;

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [],
        labels: []
    }

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
        const data: ChartConfiguration['data'] = {
            datasets: [],
            labels: []
        }
        for (let col = 1; col <= this.property.type.dimensions.length; col++) {
            LineChartComponent.arrayColumn(this.property.values, col)
            data.datasets.push({
                data: LineChartComponent.arrayColumn(this.property.values, col),
                label: this.property.type.dimensions[col - 1].name,
                // backgroundColor: 'rgba(148,159,177,0.2)',
                // borderColor: 'rgba(148,159,177,1)',
                // pointBackgroundColor: 'rgba(148,159,177,1)',
                // pointBorderColor: '#fff',
                // pointHoverBackgroundColor: '#fff',
                // pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                // fill: 'origin',
            })
        }
        data.labels = LineChartComponent.arrayColumnDate(this.property.values, 0)
        this.lineChartData = data;
    }

    public lineChartOptions: ChartConfiguration['options'] = {
        maintainAspectRatio: false,
        elements: {
            // line: {
            //     tension: 0.5
            // },
            point:{
                radius: 0
            }
        },
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            x: {
                type: 'time'
                // type: 'realtime',
                // Change options only for THIS AXIS
                // realtime: {
                //     duration: 20000,
                //     onRefresh: function (chart) {
                //         chart.data.datasets.forEach(function (dataset) {
                //             dataset.data.push({
                //                 x: Date.now(),
                //                 y: Math.random()
                //             });
                //         });
                //     }
                // }
            },
            'y-axis-0':
            {
                position: 'left',
            },
            // 'y-axis-1': {
            //     position: 'right',
            //     grid: {
            //         color: 'rgba(255,0,0,0.3)',
            //     },
            //     ticks: {
            //         color: 'red'
            //     }
            // }
        },

        plugins: {
            legend: { display: true },
            // annotation: {
            //     annotations: {
            //         box1: {
            //             // Indicates the type of annotation
            //             yScaleID: "y-axis-1",
            //             type: 'box',
            //             xMin: new Date(3 * 86400000).toISOString(),
            //             xMax: new Date(7 * 86400000).toISOString(),
            //             yMin: 50,
            //             yMax: 70,
            //             backgroundColor: 'rgba(255, 99, 132, 0.25)'
            //         },
            //         line1: {
            //             yScaleID: "y-axis-0",
            //             type: 'line',
            //             yMin: 0.5,
            //             yMax: 0.5,
            //             borderColor: 'rgb(255, 99, 132)',
            //             borderWidth: 2,
            //         }
            //     }
            // }
        }
    };

    public lineChartType: ChartType = 'line';

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    private static generateNumber(i: number): number {
        return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
    }

    public randomize(): void {
        for (let i = 0; i < this.lineChartData.datasets.length; i++) {
            for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
                this.lineChartData.datasets[i].data[j] = LineChartComponent.generateNumber(i);
            }
        }
        this.chart?.update();
    }

    // events
    public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
        console.log(event, active);
    }

    public hideOne(): void {
        const isHidden = this.chart?.isDatasetHidden(1);
        this.chart?.hideDataset(1, !isHidden);
    }

    public pushOne(): void {
        this.lineChartData.datasets.forEach((x, i) => {
            const num = LineChartComponent.generateNumber(i);
            x.data.push(num);
        });
        this.lineChartData?.labels?.push(`Label ${this.lineChartData.labels.length}`);

        this.chart?.update();
    }

    public changeColor(): void {
        this.lineChartData.datasets[2].borderColor = 'green';
        this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

        this.chart?.update();
    }

    public changeLabel(): void {
        if (this.lineChartData.labels) {
            this.lineChartData.labels[2] = ['1st Line', '2nd Line'];
        }

        this.chart?.update();
    }

}
