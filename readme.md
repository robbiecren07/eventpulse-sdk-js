# EventPulse JS SDK

EventPulse is a JavaScript SDK designed to track events on your website and send them to your EventPulse server for analysis. This SDK makes it easy to integrate EventPulse into your website with minimal setup.

## Installation

Install the EventPulse SDK via npm:

```bash
npm install @robbiecren/eventpulse-sdk-js
```

## Useage

### Initialization

To start using the EventPulse SDK, you need to initialize it with your API key. You can get your API key from the EventPulse dashboard.

```js
import eventPulse from '@robbiecren/eventpulse-sdk-js';

// Initialize the SDK with your API key
eventPulse.load(process.env.NEXT_PUBLIC_EVENTPULSE_KEY);
```

### Tracking Events

You can track different types of events such as page views and custom events.

**Page View**

To track a page view, use the `page` method. This will send information about the current page to EventPulse.

```js
eventPulse.page();
```

**Custom Events**

To track custom events, use the track method. You can pass the event name and any associated data as parameters.

```js
eventPulse.track('click', {
  category: 'Navigation',
  action: 'Route Change',
  label: window.location.href,
});
```

### Example

Here's an example of integrating the EventPulse SDK into a Next.js application:

```js
// eventpulse.js
import eventPulse from '@robbiecren/eventpulse-sdk-js';

// Initialize the SDK with your API key
eventPulse.load(process.env.NEXT_PUBLIC_EVENTPULSE_KEY);

export default eventPulse;

// _app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import eventPulse from '../utils/eventpulse';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      eventPulse.page();
    };

    // Track page views on route change
    router.events.on('routeChangeComplete', handleRouteChange);

    // Track the initial page load
    handleRouteChange(window.location.pathname);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
```

## API

### Load

`eventPulse.load(apiKey: string)`

Initializes the SDK with your API key. This method must be called before any other methods.

### Page

`eventPulse.page()`

Tracks a page view. This method sends information about the current page to EventPulse.

### Track

`eventPulse.track(event: string, data: Record<string, any>)`

Tracks a custom event. This method sends the event name and associated data to EventPulse.

## Configuration

The SDK captures and sends the following raw data with each event:

- `anonymousId`: A unique identifier for the user.
- `context`: Contextual information about the event, including:
  - `library`: Information about the SDK library.
  - `page`: Information about the current page (URL, referrer, title, etc.).
  - `userAgent`: The user agent string of the browser.
  - `ip`: The IP address of the user.
- `geo`: Geographical information about the user (city, country, latitude, longitude, region).
- `timestamp`: The timestamp of the event.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

MIT License. See the LICENSE file for more information.