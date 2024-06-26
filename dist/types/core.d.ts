export default class EventPulse {
    private static instance;
    private constructor();
    static getInstance(): EventPulse;
    load(apiKey: string): this;
    track(event: string, data: Record<string, any>): Promise<void>;
    page(): Promise<void>;
}
