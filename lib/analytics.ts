// GA4 events. gtag only exists after the visitor accepts cookies (components/layout/CookieBanner.tsx),
// so without consent every call is a no-op and nothing is sent.
type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

export function track(name: string, params?: Record<string, string>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}
