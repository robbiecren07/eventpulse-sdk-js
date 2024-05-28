import { getConfig } from './config';
import { generateEventData } from './utils';

// Function to send our track event
export async function trackEvent(event: string, properties: Record<string, any>, type: string) {
  const config = getConfig();
  const apiKey = config.apiKey;

  if (!apiKey) {
    throw new Error('API key is not set. Please call eventPulse.load(apiKey) with a valid API key.');
  }

  const encodedApiKey = btoa(apiKey); 
  const eventData = await generateEventData(event || 'Track', properties, type);

  try {
    const response = await fetch('https://eventpulse-app.vercel.app/api/js-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: encodedApiKey,
        event,
        eventData,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

// Function to track a page view
export async function page() {
  await trackEvent('Page', {}, 'page');
}

// Function to track custom events with optional properties
export async function track(event: string, properties: Record<string, any> = {}, type: string) {
  await trackEvent(event, properties, type);
}
