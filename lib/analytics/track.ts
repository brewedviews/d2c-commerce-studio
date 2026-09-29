import { META_EVENT_MAP, type AnalyticsEvent, type AnalyticsParams } from "./events";

type Gtag = (command: "event", name: string, params?: AnalyticsParams) => void;
type Fbq = (command: "track" | "trackCustom", name: string, params?: AnalyticsParams) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

/**
 * Send an event to every configured provider. Providers are only present when
 * their IDs are set (see components/analytics/analytics-scripts.tsx), so this
 * is a safe no-op in development or before analytics are connected.
 */
export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", event, params);

  const metaEvent = META_EVENT_MAP[event];
  if (metaEvent) window.fbq?.("track", metaEvent, params);
  else window.fbq?.("trackCustom", event, params);

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params);
  }
}
