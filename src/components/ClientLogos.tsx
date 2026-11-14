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

// Client logo wall, each logo in its own original colours: three to a row on
// phones (smaller), six in a row from lg up.
export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="bg-bb-paper pb-12 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-t border-line pt-8 sm:gap-10 sm:pt-12 lg:flex-row lg:items-center lg:gap-16">
          <h2 id="clients-heading" className="shrink-0 text-base font-medium text-bb-slate lg:w-44">
            Developers who sell with BrickBytes
          </h2>
          <ul className="grid flex-1 grid-cols-3 items-center gap-x-6 gap-y-6 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-6">
            {clients.map((client) => (
              <li key={client.name} className="flex items-center justify-center lg:justify-start">
                <Image
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  sizes="160px"
                  style={{ "--logo-height": `${client.displayHeight}px` } as React.CSSProperties}
                  className="h-[calc(var(--logo-height)*0.72)] w-auto max-w-full sm:h-(--logo-height)"
                />
              </li>
            ))}
            <li className="flex items-center justify-center text-sm text-bb-slate sm:text-base lg:justify-start">
              and many more
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
