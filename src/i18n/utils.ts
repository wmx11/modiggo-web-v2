import { defaultLang, languages } from "./config";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang;
  return defaultLang;
}

export async function useTranslations(lang: keyof typeof languages) {
  const translationsImport = await import(
    /* @vite-ignore */ `./${lang}.ts` || "./en.ts"
  );

  const trans = translationsImport.default;

  return function t<K extends keyof typeof trans>(key: K) {
    return trans[key];
  };
}
