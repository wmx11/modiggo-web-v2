import type { Locales } from "./config";
import en from "./en";
import lt from "./lt";
import { i18nConfig } from "./config";

export const translations = {
  en,
  lt,
};

export const useTranslation = (locale: Locales | string) => {
  const currentTranslations =
    translations[locale as keyof typeof translations] ||
    translations[i18nConfig.defaultLocale as Locales];

  /**
   * Updated translation function:
   * @param key - The translation key (dot-separated path).
   * @param options - (Optional) An object with values to interpolate into the string.
   * @param defaultValue - (Optional) A default value to return if the key isn’t found.
   */
  const t = (
    key: string,
    options?: Record<string, any>,
    defaultValue?: string
  ): string => {
    const keys = key.split(".");
    let value: any = currentTranslations;

    for (const k of keys) {
      if (!value || typeof value !== "object") {
        value = undefined;
        break;
      }
      value = value[k];
    }

    // Use the found value, defaultValue, or the key itself
    let translation = (value ?? defaultValue ?? key) as string;

    // If interpolation options are provided, replace placeholders in the translation string.
    if (options) {
      Object.keys(options).forEach((optionKey) => {
        // Create a RegExp to find the placeholder (e.g., "{{age}}")
        const regex = new RegExp(`{{\\s*${optionKey}\\s*}}`, "g");
        translation = translation.replace(regex, options[optionKey]);
      });
    }

    return translation;
  };

  return { t };
};

export const getLocalizedLink = (locale: Locales, link?: string) => {
  if (link === "/") return `/${locale}/`;
  return `/${locale}${link}${link && link[link.length - 1] === "/" ? `` : "/"}`;
};
