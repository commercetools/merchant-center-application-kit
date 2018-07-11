const loadEn = () => import('./data/en.json');
const loadDe = () => import('./data/de.json');
const loadEs = () => import('./data/es.json');

export default {
  en: loadEn,
  de: loadDe,
  es: loadEs,
};
