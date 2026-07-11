/*
 * Site configuration.
 * The readiness check posts to Kuroko HQ's public intake API (cross-origin;
 * HQ allowlists this site's origins). When HQ moves to app.kuroko.co.uk,
 * only this value changes.
 */
export const INTAKE_URL = "https://kuroko-hq.vercel.app/api/intake";
