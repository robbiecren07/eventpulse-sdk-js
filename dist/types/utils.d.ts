declare function setCookie(name: string, value: string, days: number): void;
declare function getCookie(name: string): string | null;
declare function generateUUID(): string;
declare const getAnonymousID: () => string;
declare const generateEventData: (event: string, properties: Record<string, any>, type: string) => Promise<{
    anonymousId: string;
    context: {
        library: {
            name: string;
            version: string;
        };
        page: {
            path: string;
            referrer: string;
            search: string;
            title: string;
            url: string;
        };
        userAgent: string;
    };
    event: string;
    properties: Record<string, any>;
    timestamp: string;
    type: string;
}>;
export { setCookie, getCookie, generateUUID, getAnonymousID, generateEventData };
