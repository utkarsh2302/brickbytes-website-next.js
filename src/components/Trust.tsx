import BrandIcon, { type BrandIconName } from "./BrandIcon";
import SectionHeading from "./ui/SectionHeading";

const promises: { icon: BrandIconName; title: string; body: string }[] = [
  {
    icon: "lock",
    title: "Kept secure",
    body: "Your layout files, prices and buyer details are stored securely and shared only with the people you approve.",
  },
  {
    icon: "home",
    title: "Owned by you",
    body: "Inventory, pricing history and buyer details belong to you. We never sell your leads or pricing: we sell software, not data.",
  },
  {
    icon: "people",
    title: "You decide who sees what",
    body: "Add brokers and sales staff, choose what each of them can see, and remove access at any time.",
  },
];

export default function Trust() {
  return (
    <section id="security" className="relative bg-bb-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Your project data stays yours."
          lead="BrickBytes is built for developers who want to keep ownership and control of their project information."
        />

        <ul className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:mt-16 md:grid-cols-3 md:gap-8">
          {promises.map((promise) => (
            <li key={promise.title} className="flex flex-col gap-4">
              <BrandIcon name={promise.icon} className="h-10 w-10" />
              <h3 className="font-display text-xl font-semibold text-ink">{promise.title}</h3>
              <p className="max-w-sm text-base leading-relaxed text-bb-slate">{promise.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
