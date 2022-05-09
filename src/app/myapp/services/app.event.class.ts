
export enum AppEventType {
    SelectedThing = 'SELECTED_THING',
    ChangedTimeRange = 'CHANGED_TIME_RANGE'
}

export class AppEvent<T> {
    constructor(
        public type: AppEventType,
        public payload: T,
    ) { }
}