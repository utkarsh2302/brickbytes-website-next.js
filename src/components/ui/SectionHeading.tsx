// Section title and optional lead paragraph, left aligned. No eyebrow labels:
// the headline says what the section is about.
export default function SectionHeading({
  title,
  lead,
  id,
  className = "",
}: {
  title: string;
  lead?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 id={id} className="font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-5 text-lg leading-relaxed text-bb-slate">{lead}</p>}
    </div>
  );
}
