import BrandIcon from "./BrandIcon";
import { OFFICE_ADDRESS_LINE, OFFICE_HOURS } from "@/lib/contact";

// Company details, shown on /about and /contact.
export default function CompanyDetails() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <div className="flex gap-4 rounded-2xl border border-line bg-white p-6">
        <BrandIcon name="pin" className="h-8 w-8 shrink-0" />
        <div>
          <p className="text-sm font-medium text-bb-slate">Office</p>
          <p className="mt-1 text-base leading-relaxed text-ink">
            {OFFICE_ADDRESS_LINE}
          </p>
          <p className="mt-2 text-sm text-bb-slate">Open {OFFICE_HOURS.line}</p>
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-white p-6">
        <p className="text-sm font-medium text-bb-slate">CIN</p>
        <p className="mt-1 font-mono text-base text-ink">U62011RJ2026PTC113544</p>
      </div>
      <div className="rounded-2xl border border-line bg-white p-6">
        <p className="text-sm font-medium text-bb-slate">GSTIN</p>
        <p className="mt-1 font-mono text-base text-ink">08AAOCB6672J1Z2</p>
      </div>
    </div>
  );
}
