export const SITE = {
  name: "CloFr",
  tagline: "Premium Laundry & Dry Cleaning",
  whatsappNumber: "917977518133",
  phoneDisplay: "+91 7977518133",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
