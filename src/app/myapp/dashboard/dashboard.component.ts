import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BucketService } from '../services/bucket.service';

@Component({
    selector: 'app-dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private bucketService: BucketService) { }

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
    }

}
