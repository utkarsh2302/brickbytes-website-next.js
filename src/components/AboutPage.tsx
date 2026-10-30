import Image from "next/image";
import BrandIcon, { type BrandIconName } from "./BrandIcon";
import CompanyDetails from "./CompanyDetails";
import FinalCTA from "./FinalCTA";
import GlassAccent from "./GlassAccent";
import JsonLd from "./JsonLd";
import PageHero from "./ui/PageHero";
import SectionHeading from "./ui/SectionHeading";
import { ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const missionItems: { tag: string; title: string; desc: string; icon: BrandIconName }[] = [
  {
    tag: "Mission",
    title: "Replace static paperwork",
    desc: "Turn layout plans into interactive maps that give buyers clarity, developers control and brokers the tools to close faster.",
    icon: "pin",
  },
  {
    tag: "Vision",
    title: "A new standard for selling projects",
    desc: "Make the interactive map the normal way real estate projects are explored, understood and sold, in place of static brochures.",
    icon: "layout",
  },
  {
    tag: "Philosophy",
    title: "Precision meets presentation",
    desc: "Every plot on the map matches the approved layout. Every interaction has a purpose. We build tools that respect the developer's data and the buyer's time.",
    icon: "area",
  },
];

const solutionItems: { text: string; icon: BrandIconName }[] = [
  { text: "Interactive project maps that buyers explore on their own", icon: "pin" },
  { text: "Instant answers to the questions buyers ask most", icon: "people" },
  { text: "Live availability, the same for developers, brokers and buyers", icon: "layout" },
  { text: "A clear sense of each plot before the site visit", icon: "facing" },
];

const values: { title: string; desc: string; icon: BrandIconName }[] = [
  {
    title: "User-first design",
    desc: "Every feature starts with one question: does this help someone make a better decision?",
    icon: "people",
  },
  {
    title: "Accurate data",
    desc: "Plot sizes, road widths and availability are checked before launch and stay in sync in real time.",
    icon: "area",
  },
  {
    title: "Trust through transparency",
    desc: "Buyers see exactly what exists. No hidden conditions, no outdated information. What you see is what the project is.",
    icon: "lock",
  },
  {
    title: "Speed matters",
    desc: "Fast onboarding, fast loading, fast answers. Projects go live in 10 to 14 business days and buyers decide sooner.",
    icon: "clock",
  },
];

// Add `photo: "/team/<name>.jpg"` (portrait, at least 800×1000) to show a photo
// instead of the brand monogram.
export const founders: { name: string; initials: string; role: string; photo?: string; linkedIn?: string }[] = [
  {
    name: "Utkarsh Sharma",
    initials: "US",
    role: "Founder & Director",
    photo: "/team/utkarsh-sharma.webp",
    linkedIn: "https://www.linkedin.com/in/utkarsh-sharma232002",
  },
  {
    name: "Rashika Verma",
    initials: "RV",
    role: "Founder & Director",
    photo: "/team/rashika-verma.webp",
    linkedIn: "https://www.linkedin.com/in/rashika-verma-313468270",
  },
];

// The founders as schema.org people, and the Organization's `founder` link to
// them. Both names are common, so search engines and AI answers need this tie
// to BrickBytes to pick these photos over other people with the same name.
const founderPeople = founders.map((founder) => ({
  "@type": "Person",
  "@id": `${SITE_URL}/about#${founder.name.toLowerCase().replace(/ /g, "-")}`,
  name: founder.name,
  jobTitle: founder.role,
  url: `${SITE_URL}/about`,
  ...(founder.photo && { image: `${SITE_URL}${founder.photo}` }),
  ...(founder.linkedIn && { sameAs: [founder.linkedIn] }),
  worksFor: { "@id": ORGANIZATION_ID },
}));
const founderJsonLd = [
  ...founderPeople,
  { "@id": ORGANIZATION_ID, founder: founderPeople.map((person) => ({ "@id": person["@id"] })) },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd nodes={founderJsonLd} />
      <PageHero
        title="Why we built BrickBytes"
        lead="Real estate projects are still sold with static PDFs, old photos and endless phone calls. BrickBytes, a venture by BrickNova Technologies in Jaipur, turns each project into a live, interactive map, so buyers, brokers and developers work from the same facts."
        accent="circles"
      />

      {/* Founders sit right under the opening, as a compact block on the same Paper */}
      <section aria-labelledby="founders-heading" className="relative bg-bb-paper pb-24 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-5">
              <h2 id="founders-heading" className="font-display text-3xl font-extrabold leading-[1.05] text-ink sm:text-4xl">
                Founded in Jaipur
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-bb-slate">
                BrickBytes is built by BrickNova Technologies and led by its two founders.
              </p>
            </div>
            <ul className="flex gap-6 sm:gap-8 lg:col-span-7 lg:justify-end">
              {founders.map((founder, index) => (
                <li key={founder.name} className="w-40 sm:w-44">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bb-stone">
                    {founder.photo ? (
                      <Image
                        src={founder.photo}
                        alt={`${founder.name}, ${founder.role} of BrickBytes`}
                        fill
                        sizes="176px"
                        className="object-cover"
                      />
                    ) : (
                      <>
                        <GlassAccent
                          variant={index % 2 === 0 ? "pin" : "circles"}
                          className="-right-12 -top-8 w-[180px]"
                        />
                        <span
                          aria-hidden
                          className="absolute bottom-3 left-4 font-display text-4xl font-extrabold tracking-[-0.04em] text-ink"
                        >
                          {founder.initials}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-extrabold text-ink">{founder.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-bb-slate">{founder.role}</p>
                  {founder.linkedIn && (
                    <a
                      href={founder.linkedIn}
                      className="mt-2 inline-flex text-sm font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      LinkedIn<span className="sr-only"> profile of {founder.name}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative bg-bb-stone py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What we're working towards" className="mb-12 sm:mb-16" />
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {missionItems.map((item) => (
              <li key={item.tag} className="rounded-2xl border border-line bg-white p-8">
                <BrandIcon name={item.icon} className="h-10 w-10" />
                <p className="mt-6 text-sm font-medium text-bb-slate">{item.tag}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-bb-slate">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-bb-paper py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What BrickBytes does"
            lead="We replace scattered layouts, manual follow-ups and fragmented information with one platform that every person in the sale can rely on."
            className="mb-12 sm:mb-16"
          />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {solutionItems.map((item) => (
              <li key={item.text} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-6">
                <BrandIcon name={item.icon} className="h-9 w-9 shrink-0" />
                <span className="text-base leading-relaxed text-ink">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-bb-stone py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What guides our work" className="mb-12 sm:mb-16" />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value.title} className="flex flex-col gap-4">
                <BrandIcon name={value.icon} className="h-10 w-10" />
                <h3 className="font-display text-xl font-semibold text-ink">{value.title}</h3>
                <p className="text-base leading-relaxed text-bb-slate">{value.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="company-heading" className="relative bg-bb-paper py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="company-heading" className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            BrickNova Technologies Private Limited
          </h2>
          <div className="mt-8">
            <CompanyDetails />
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
