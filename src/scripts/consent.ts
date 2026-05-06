const CONSENT_KEY = 'baldurion_loaded_embeds';

type ConsentData = Record<string, string[]>;

function getConsent(): ConsentData {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) ?? '{}') as ConsentData;
  } catch {
    return {};
  }
}

export function hasLoadedEmbed(provider: string, id: string): boolean {
  return (getConsent()[provider] ?? []).includes(id);
}

export function markEmbedLoaded(provider: string, id: string): void {
  const data = getConsent();
  if (!data[provider]) data[provider] = [];
  if (!data[provider].includes(id)) {
    data[provider].push(id);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
  }
}

export function clearAllEmbeds(): void {
  localStorage.removeItem(CONSENT_KEY);
}

export function getEmbedCount(): number {
  return Object.values(getConsent()).reduce((sum, ids) => sum + ids.length, 0);
}
