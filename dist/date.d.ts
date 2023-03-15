interface DateAddConfig {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    min?: number;
    sec?: number;
    [prop: string]: any;
}
export declare const dateFormat: (date: Date, fmt?: string) => string;
export declare const dateParse: (str: string, fmt?: string) => Date;
export declare const dateAdd: (date: Date, config: number | DateAddConfig) => Date;
export declare const firstDateInMonth: (date: Date) => Date;
export declare const lastDateInMonth: (date: Date) => Date;
export declare const firstWeekInMonth: (date: Date) => Date;
export declare const lastWeekInMonth: (date: Date) => Date;
export declare const weekRange: (startDate: Date, endDate: Date, splitDay?: number) => {
    start: Date;
    end: Date;
    duration: number;
}[];
export declare const weekendsCount: (startDate: Date, endDate: Date) => number;
export {};
