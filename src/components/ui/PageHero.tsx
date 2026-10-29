import GlassAccent from "../GlassAccent";

// Opening section for inner pages: headline, plain lead and optional actions on
// Paper, with a glass-system accent cropped off the right edge (desktop only,
// so it never sits under the text on small screens).
export default function PageHero({
  title,
  lead,
  accent = "pin",
  children,
}: {
  title: string;
  lead?: string;
  accent?: "pin" | "circles";
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-bb-paper pb-20 pt-32 sm:pb-24 sm:pt-40">
      <GlassAccent variant={accent} className="-right-56 -top-16 hidden w-[560px] md:block lg:-right-40" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl md:max-w-xl lg:max-w-2xl">
          <h1 className="font-display text-5xl font-extrabold leading-[1] tracking-[-0.035em] text-ink sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bb-slate sm:text-xl sm:leading-relaxed">{lead}</p>}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}
