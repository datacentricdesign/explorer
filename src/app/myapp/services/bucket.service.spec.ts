import { inject } from '@angular/core/testing';
import { BucketService } from './bucket.service';

let httpClientSpy: { get: jasmine.Spy };
let bucketService: BucketService

describe('BucketService', () => {

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    });

    describe('find()', () => {

        it('should return an Observable<Array<Video>>', () => {
            // test goes here
        });

        it('should return an Observable<Array<Video>>',
            inject([BucketService], (bucketService) => {
                // test goes here
            }));
    });
});