export const RESTAURANT_URL =
  import.meta.env.VITE_RESTAURANT_URL ??
  (import.meta.env.DEV ? "http://localhost:3000" : "https://www.quinuaq.com");
