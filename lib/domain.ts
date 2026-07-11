/*
 * Kuroko readiness-check vocabulary — ported from kuroko-studios/hq lib/domain.ts.
 * Values must stay in sync with HQ: its /api/intake validates against these lists.
 */

export type Option<T extends string = string> = { value: T; label: string };

/* ---------------------------------------------------------------- leads */

export const TEAM_SIZE = [
  { value: "solo", label: "Just me" },
  { value: "2-5", label: "2–5" },
  { value: "6-15", label: "6–15" },
  { value: "16-50", label: "16–50" },
  { value: "50+", label: "50+" },
] as const satisfies readonly Option[];

export const AI_MATURITY = [
  { value: "none", label: "Not using AI at all yet" },
  { value: "experimenting", label: "A few people experimenting on their own" },
  { value: "regular_unstructured", label: "Using it regularly, but no real structure" },
  { value: "connected", label: "We have tools connected and some rules in place" },
] as const satisfies readonly Option[];

export const TOOLS = [
  { value: "email", label: "Email" },
  { value: "shared_files", label: "Shared files" },
  { value: "crm", label: "CRM" },
  { value: "project_tracking", label: "Project tracking" },
  { value: "accounts_finance", label: "Accounts / finance" },
  { value: "scheduling", label: "Scheduling" },
  { value: "customer_service", label: "Customer service" },
  { value: "website_ecommerce", label: "Website / e-commerce" },
] as const satisfies readonly Option[];

export const PAINS = [
  { value: "email_admin", label: "Email and admin" },
  { value: "quotes_proposals", label: "Quotes and proposals" },
  { value: "reporting", label: "Reporting" },
  { value: "scheduling", label: "Scheduling" },
  { value: "customer_enquiries", label: "Customer enquiries" },
  { value: "content_marketing", label: "Content and marketing" },
  { value: "data_entry", label: "Data entry" },
  { value: "chasing_paperwork", label: "Chasing paperwork" },
] as const satisfies readonly Option[];

export const WHO_USES = [
  { value: "just_me", label: "Just me" },
  { value: "1-3", label: "1–3 of us" },
  { value: "whole_team", label: "The whole team" },
  { value: "clients_too", label: "Clients too" },
] as const satisfies readonly Option[];

export const PAIN_TYPE = [
  { value: "doing", label: "We drown in doing — admin, quotes, chasing" },
  { value: "seeing", label: "We can't see clearly — info scattered across tools" },
  { value: "both", label: "Honestly, both" },
] as const satisfies readonly Option[];

export const RHYTHM = [
  { value: "on_demand", label: "Help when we ask for it" },
  { value: "always_on", label: "Things happening automatically in the background" },
  { value: "single_view", label: "One place to see the whole business" },
  { value: "unsure", label: "Not sure yet" },
] as const satisfies readonly Option[];

export const BUDGET_BAND = [
  { value: "under_2_5k", label: "Under £2.5k" },
  { value: "2_5k_7_5k", label: "£2.5k–£7.5k" },
  { value: "7_5k_15k", label: "£7.5k–£15k" },
  { value: "15k_plus", label: "£15k+" },
  { value: "unsure", label: "Not sure yet" },
] as const satisfies readonly Option[];

export const TIMELINE = [
  { value: "asap", label: "As soon as possible" },
  { value: "this_quarter", label: "This quarter" },
  { value: "exploring", label: "Just exploring" },
] as const satisfies readonly Option[];

export const SENSITIVE_DATA = [
  { value: "client_data", label: "Client data" },
  { value: "financial", label: "Financial" },
  { value: "health_legal", label: "Health / legal" },
  { value: "none", label: "None / not sure" },
] as const satisfies readonly Option[];
