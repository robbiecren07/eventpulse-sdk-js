const packageVersion = process.env.PACKAGE_VERSION || 'unknown';

// Function to set a cookie
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to get a cookie by name
function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to generate a UUID
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Function to get or set the anonymous ID
const getAnonymousID = (): string => {
  let anonymousID = getCookie('eventPulse_anonymousID');
  if (!anonymousID) {
    anonymousID = generateUUID();
    setCookie('eventPulse_anonymousID', anonymousID, 7);
  }
  return anonymousID;
};

// Function to create raw data
const generateEventData = async (event: string, properties: Record<string, any>, type: string) => {
  return {
    anonymousId: getAnonymousID(),
    context: {
      library: {
        name: "eventpulse-sdk-js.cjs",
        version: packageVersion,
      },
      page: {
        path: window.location.pathname,
        referrer: document.referrer,
        search: window.location.search,
        title: document.title,
        url: window.location.href,
      },
      userAgent: navigator.userAgent,
    },
    event,
    properties,
    timestamp: new Date().toISOString(),
    type,
  };
};

export { setCookie, getCookie, generateUUID, getAnonymousID, generateEventData };
