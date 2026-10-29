import Image from "next/image";

const compositions = {
  pin: "/brand/glass-shapes.svg",
  circles: "/brand/glass-circles.svg",
} as const;

// Decorative glass-system composition (Guidelines p. 20): flat brand shapes,
// placed big and cropped off a section edge. Position and size it with
// className, e.g. "-right-40 -top-24 w-[560px]". The parent must be
// `relative overflow-hidden`.
export default function GlassAccent({
  variant = "pin",
  className = "",
}: {
  variant?: keyof typeof compositions;
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute max-w-none ${className}`}>
      <Image src={compositions[variant]} alt="" width={600} height={600} className="w-full" />
    </div>
  );
}
