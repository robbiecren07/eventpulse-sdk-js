import EventPulse from "./core";

const eventPulse = EventPulse.getInstance();

// Browser-specific code
if (typeof window !== 'undefined') {
  // Initialize the global variable
  (window as any).eventPulse = {
    load: eventPulse.load.bind(eventPulse),
    track: eventPulse.track.bind(eventPulse),
    page: eventPulse.page.bind(eventPulse),
  };
}

export default eventPulse;
