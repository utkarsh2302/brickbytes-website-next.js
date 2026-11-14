import Image from "next/image";

// Heights are set so every logo covers roughly the same area (about 120×48 px),
// which keeps square marks from looking smaller than wide wordmarks.
const clients = [
  { name: "Gaurs", src: "/clients/gaurs.svg", width: 497, height: 201, displayHeight: 48 },
  { name: "Rajbhoomi", src: "/clients/rajbhoomi.png", width: 695, height: 240, displayHeight: 54 },
  { name: "Highfly Real Estate Group", src: "/clients/highfly.png", width: 385, height: 240, displayHeight: 60 },
  { name: "Shyamashish Group", src: "/clients/shyamashish.png", width: 207, height: 198, displayHeight: 72 },
  { name: "Navsaar", src: "/clients/navsaar.png", width: 510, height: 222, displayHeight: 54 },
];

function Logo({ client, decorative = false }: { client: (typeof clients)[number]; decorative?: boolean }) {
  return (
    <Image
      src={client.src}
      alt={decorative ? "" : client.name}
      width={client.width}
      height={client.height}
      sizes="160px"
      style={{ height: client.displayHeight }}
      className="w-auto max-w-none lg:max-w-full"
    />
  );
}

// Client logo wall, each logo in its own original colours. On phones the
// logos run as one moving strip (a second, hidden copy makes the loop
// seamless); from lg up they sit in a row. With reduced motion the strip
// stays still and scrolls by hand.
export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="bg-bb-paper pb-12 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-t border-line pt-8 sm:gap-10 sm:pt-12 lg:flex-row lg:items-center lg:gap-16">
          <h2 id="clients-heading" className="shrink-0 text-base font-medium text-bb-slate lg:w-44">
            Developers who sell with BrickBytes
          </h2>
          <div className="-mx-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:overflow-x-auto sm:-mx-6 lg:mx-0 lg:flex-1 lg:overflow-visible lg:[mask-image:none]">
            <ul className="flex w-max animate-marquee items-center motion-reduce:animate-none lg:grid lg:w-auto lg:animate-none lg:grid-cols-6 lg:gap-10">
              {clients.map((client) => (
                <li key={client.name} className="flex shrink-0 items-center pr-12 lg:pr-0">
                  <Logo client={client} />
                </li>
              ))}
              {clients.map((client) => (
                <li key={`${client.name}-copy`} aria-hidden className="flex shrink-0 items-center pr-12 motion-reduce:hidden lg:hidden">
                  <Logo client={client} decorative />
                </li>
              ))}
              <li className="hidden items-center text-base text-bb-slate lg:flex">and many more</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
