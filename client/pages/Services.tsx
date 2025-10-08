import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { whatsappLink } from "@/lib/site";
import { Droplets, Sparkles, Shirt, Footprints, Home, Clock, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const categories = [
  {
    title: "Laundry",
    desc: "Everyday clothes care with premium detergents.",
    Icon: Shirt,
    types: [
      "Wash & Fold",
      "Wash & Iron",
      "Premium Care (delicates)",
      "Stain Treatment",
      "Express 24–48h",
    ],
  },
  {
    title: "Dry Cleaning",
    desc: "Delicate fabric care handled by experts.",
    Icon: Droplets,
    types: [
      "Suits & Blazers",
      "Saree / Silk / Velvet",
      "Wool / Cashmere",
      "Gowns & Formal Wear",
      "Curtains (dry clean)",
    ],
  },
  {
    title: "Ironing / Pressing",
    desc: "Crisp finish with careful steam pressing.",
    Icon: Sparkles,
    types: ["Steam Iron", "Light Starch", "Heavy Starch", "On-hanger / Folded"],
  },
  {
    title: "Footwear Care",
    desc: "Professional shoe cleaning and restoration.",
    Icon: Footprints,
    types: [
      "Sneaker Cleaning",
      "Deep Clean",
      "Sole Whitening",
      "Leather Conditioning & Polish",
      "Suede/Nubuck Care",
    ],
  },
  {
    title: "Household",
    desc: "Keep your home fabrics fresh and clean.",
    Icon: Home,
    types: [
      "Bedsheets (Single/Double)",
      "Blankets & Quilts",
      "Curtains",
      "Sofa Covers",
      "Pillows & Cushions",
    ],
  },
  {
    title: "Add-ons",
    desc: "Flexible options for busy schedules.",
    Icon: Clock,
    types: ["Express Pickup", "Same-day Express (select items)", "Packaging on request"],
  },
];

export default function Services() {
  const { t } = useI18n();
  return (
    <section className="pt-4 sm:pt-10 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{t("services.title")}</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto break-words">{t("services.intro")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-5 sm:gap-6 sm:grid-cols-2 auto-rows-fr">
            {categories.map(({ title, desc, Icon, types }) => (
              <Card
                key={title}
                className="group relative h-full overflow-hidden border-emerald-100 dark:border-emerald-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600 hover:ring-1 hover:ring-emerald-200 dark:hover:ring-emerald-700 focus-within:ring-2 focus-within:ring-emerald-300 dark:focus-within:ring-emerald-600"
              >
                <CardContent className="p-5 sm:p-6 flex flex-col h-full bg-gradient-to-br from-transparent to-transparent group-hover:from-emerald-50/40 dark:group-hover:from-emerald-900/20">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 grid place-items-center transition-colors duration-200 group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-base sm:text-lg">{title}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                  <ul className="mt-4 text-sm leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-y-2 flex-1">
                    {types.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
                        <span className="text-[0.95rem]">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 mt-4 border-t flex items-center justify-end">
                    <Button
                      asChild
                      size="sm"
                      className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <a href="/pricing">See Pricing</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{t("services.notes.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                  <li>{t("services.notes.n1")}</li>
                  <li>{t("services.notes.n2")}</li>
                  <li>{t("services.notes.n3")}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
