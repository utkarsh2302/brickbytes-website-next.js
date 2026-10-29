import { FileText, Layers, Phone } from "lucide-react";
import BrandIcon, { type BrandIconName } from "./BrandIcon";
import GlassAccent from "./GlassAccent";
import SectionHeading from "./ui/SectionHeading";

const onPaper = [
  {
    icon: FileText,
    title: "Static layouts",
    desc: "Buyers try to read flat CAD drawings and PDF layouts on their own.",
  },
  {
    icon: Phone,
    title: "Manual follow-ups",
    desc: "Your team spends hours answering the same availability and price questions.",
  },
  {
    icon: Layers,
    title: "Scattered information",
    desc: "Price lists, plot status and emails sit in separate places.",
  },
];

const withBrickBytes: { icon: BrandIconName; title: string; desc: string }[] = [
  {
    icon: "layout",
    title: "Interactive exploration",
    desc: "Buyers move around the layout, filter by availability and zoom in 3D.",
  },
  {
    icon: "chart",
    title: "One source of truth",
    desc: "Prices, plot status, facing and documents stay in sync in one place.",
  },
  {
    icon: "pin",
    title: "Clearer decisions",
    desc: "Aerial views help buyers see the site and the plot before they visit.",
  },
];

export default function Transformation() {
  return (
    <section id="transformation" className="relative overflow-hidden bg-bb-stone py-24 text-ink sm:py-32">
      <GlassAccent variant="circles" className="-right-56 -top-44 hidden w-[560px] lg:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="From paper brochures to a live project map."
          lead="What changes for your buyers and your sales team when the whole project is online."
          className="mb-14 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-bb-paper p-6 sm:p-10">
            <h3 className="font-display text-xl font-semibold text-ink">Selling on paper</h3>
            <ul className="mt-8 space-y-7">
              {onPaper.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-bb-slate" strokeWidth={1.5} aria-hidden />
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-base leading-relaxed text-bb-slate">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgb(28_26_23/0.04),0_24px_48px_-28px_rgb(28_26_23/0.18)] sm:p-10">
            <h3 className="font-display text-xl font-semibold text-ink">Selling with BrickBytes</h3>
            <ul className="mt-8 space-y-7">
              {withBrickBytes.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <BrandIcon name={item.icon} className="h-7 w-7 shrink-0" />
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-base leading-relaxed text-bb-slate">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
