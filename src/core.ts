import { setConfig } from './config';
import { page, track } from './events';

export default class EventPulse {
  private static instance: EventPulse;

  private constructor() {}

  static getInstance() {
    if (!EventPulse.instance) {
      EventPulse.instance = new EventPulse();
    }
    return EventPulse.instance;
  }

  load(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is not set.');
    }
    setConfig({ apiKey });
    return this;
  }

  async track(event: string, data: Record<string, any>) {
    await track(event, data, 'track');
  }

  async page() {
    await page();
  }
}