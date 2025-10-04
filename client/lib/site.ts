export const SITE = {
  name: "CloFr",
  tagline: "Premium Laundry & Dry Cleaning",
  whatsappNumber: "918591462122",
  phoneDisplay: "+91 8591462122",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
