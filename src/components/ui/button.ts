// Pill buttons used across the site. Use one primary (Byte Orange) per screen.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export const buttonPrimary = `${base} bg-bb-orange text-white hover:bg-bb-kiln`;
export const buttonSecondary = `${base} border border-ink/15 bg-white text-ink hover:border-ink/35`;
