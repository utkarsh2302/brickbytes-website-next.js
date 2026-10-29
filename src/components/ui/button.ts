// Pill buttons used across the site. Use one primary (Byte Orange) per screen.
// Ink text on the orange: white only reaches 3.1:1 there, ink reaches 5.6:1
// (4.5:1 on the Kiln hover), so the label passes WCAG AA.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export const buttonPrimary = `${base} bg-bb-orange text-ink hover:bg-bb-kiln`;
export const buttonSecondary = `${base} border border-ink/15 bg-white text-ink hover:border-ink/35`;
