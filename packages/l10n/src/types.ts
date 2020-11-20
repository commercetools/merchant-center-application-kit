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
  name: string;
  abbr: string;
  offset: string;
};
export type TimeZones = Record<string, TimeZone>;

export type LocalizedField = {
  locale: string;
  value: string;
};

export type LocalizedString = {
  [key: string]: string;
};

export type FieldNameTranformationMapping = {
  from: string;
  to: string;
};

export type LocalizeSignatureOptions<T> = {
  obj?: T | null;
  key: keyof T;
  language: string;
  fallbackOrder?: string[];
  fallback?: string;
};
