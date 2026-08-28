/**
 * Analytics consent (GDPR/RODO).
 *
 * GA4 is loaded on every page but starts with `analytics_storage: 'denied'`
 * via Consent Mode v2, so it sets no cookies until the visitor accepts.
 * This module is the single place that flips that switch.
 */

export const ANALYTICS_CONSENT_KEY = 'baldurion_consent_analytics';
export const GA_MEASUREMENT_ID = 'G-B543SXCHWQ';

export type AnalyticsConsent = 'granted' | 'denied';

type GtagFn = (...args: unknown[]) => void;

function gtag(...args: unknown[]): void {
  const fn = (window as unknown as { gtag?: GtagFn }).gtag;
  fn?.(...args);
}

/** The stored decision, or null when the visitor has not chosen yet. */
export function getAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function hasDecidedAnalytics(): boolean {
  return getAnalyticsConsent() !== null;
}

/** Remove the cookies GA4 already wrote, so a withdrawal takes effect now. */
function clearGaCookies(): void {
  const domain = location.hostname.replace(/^www\./, '');
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim();
    if (!name || !/^_ga/.test(name)) continue;
    for (const scope of ['', `;domain=${domain}`, `;domain=.${domain}`]) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${scope}`;
    }
  }
}

/**
 * Record the decision and tell GA4 about it in the same tick, so accepting
 * starts measurement without a reload and rejecting stops it immediately.
 */
export function setAnalyticsConsent(consent: AnalyticsConsent): void {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  } catch {
    // private mode: consent lasts for this page view only
  }

  gtag('consent', 'update', {
    analytics_storage: consent,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  // GA4 picks the accepted session up from the consent update itself, so no
  // extra page_view is sent here (that would double-count the current page).
  if (consent === 'denied') clearGaCookies();
}
