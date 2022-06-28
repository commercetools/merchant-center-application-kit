export type Currency = {
  label: string;
  symbol: string;
};
export type Currencies = Record<string, Currency>;

export type Countries = Record<string, string>;

export type Language = {
  language: string;
  country?: string;
};
export type Languages = Record<string, Language>;

export type TimeZone = {
  id: string;
  name: string;
  abbr: string;
  offset: string;
  translationFor: string[];
};
export type TimeZones = Record<string, TimeZone>;

export type TimeZoneTranslations = Record<string, string>;

export type TimeZoneTranslationsMap = Record<string, string[]>;

export type LocalizedField = {
  locale: string;
  value: string;
};

export type LocalizedString = Record<string, string>;

export type FieldNameTranformationMapping = {
  from: string;
  to: string;
};

export type FormatLocalizedStringOptions<T> = {
  key: keyof T;
  locale: string | null;
  fallbackOrder?: string[];
  fallback?: string;
};
