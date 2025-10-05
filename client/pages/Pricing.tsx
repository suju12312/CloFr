import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MEN_RATES, WOMEN_RATES, HOUSEHOLD_RATES, FOOTWEAR_RATES, PACKAGES } from "@/lib/pricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

function RatesTable({ data, labels }: { data: { item: string; washFold?: number; dryClean?: number; iron?: number; steamIron?: number }[]; labels?: { c1: string; c2: string; c3: string; c4?: string } }) {
  const l = labels ?? { c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing" };
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0 hidden md:block">
      <Table className="w-full min-w-[720px]">
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap text-left">Item</TableHead>
            <TableHead className="whitespace-nowrap text-left">{l.c1}</TableHead>
            <TableHead className="whitespace-nowrap text-left">{l.c2}</TableHead>
            <TableHead className="whitespace-nowrap text-left">{l.c3}</TableHead>
            {l.c4 ? <TableHead className="whitespace-nowrap text-left">{l.c4}</TableHead> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((r) => (
            <TableRow key={r.item}>
              <TableCell className="font-medium whitespace-nowrap text-sm sm:text-base pr-4">{r.item}</TableCell>
              <TableCell className="whitespace-nowrap text-sm sm:text-base pr-4">{r.washFold ? `₹${r.washFold}` : "-"}</TableCell>
              <TableCell className="whitespace-nowrap text-sm sm:text-base pr-4">{r.dryClean ? `₹${r.dryClean}` : "-"}</TableCell>
              <TableCell className="whitespace-nowrap text-sm sm:text-base pr-4">{r.iron ? `₹${r.iron}` : ""}</TableCell>
              {l.c4 ? <TableCell className="whitespace-nowrap text-sm sm:text-base pr-4">{r.steamIron ? `₹${r.steamIron}` : "-"}</TableCell> : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function RatesListMobile({ data, labels }: { data: { item: string; washFold?: number; dryClean?: number; iron?: number; steamIron?: number }[]; labels?: { c1: string; c2: string; c3: string; c4?: string } }) {
  const l = labels ?? { c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing" };
  return (
    <div className="md:hidden space-y-3">
      {data.map((r) => (
        <div key={r.item} className="rounded-lg border bg-card p-3">
          <div className="font-semibold">{r.item}</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">{l.c1}</div>
            <div className="text-right">{r.washFold ? `₹${r.washFold}` : "-"}</div>
            <div className="text-muted-foreground">{l.c2}</div>
            <div className="text-right">{r.dryClean ? `₹${r.dryClean}` : "-"}</div>
            <div className="text-muted-foreground">{l.c3}</div>
            <div className="text-right">{r.iron ? `₹${r.iron}` : ""}</div>
            {l.c4 ? <><div className="text-muted-foreground">{l.c4}</div><div className="text-right">{r.steamIron ? `₹${r.steamIron}` : "-"}</div></> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Pricing() {
  const { t } = useI18n();
  return (
    <section className="pt-4 sm:pt-10 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{t("pricing.title")}</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.intro")}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("pricing.itemRates")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="men">
                  <TabsList
                    className="flex gap-2 overflow-x-auto max-w-full snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    <TabsTrigger value="men" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.men")}</TabsTrigger>
                    <TabsTrigger value="women" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.women")}</TabsTrigger>
                    <TabsTrigger value="household" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.household")}</TabsTrigger>
                    <TabsTrigger value="footwear" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.footwear")}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="men" className="mt-4">
                    <RatesListMobile data={MEN_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                    <RatesTable data={MEN_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                  </TabsContent>
                  <TabsContent value="women" className="mt-4">
                    <RatesListMobile data={WOMEN_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                    <RatesTable data={WOMEN_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                  </TabsContent>
                  <TabsContent value="household" className="mt-4">
                    <RatesListMobile data={HOUSEHOLD_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean"}}/>
                    <RatesTable data={HOUSEHOLD_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean"}}/>
                  </TabsContent>
                  <TabsContent value="footwear" className="mt-4">
                    <RatesListMobile data={FOOTWEAR_RATES} labels={{ c1: "Cleaning", c2: "Deep Clean", c3: "Polish" }} />
                    <RatesTable data={FOOTWEAR_RATES} labels={{ c1: "Cleaning", c2: "Deep Clean", c3: "Polish" }} />
                  </TabsContent>
                </Tabs>
                <p className="mt-3 text-xs text-muted-foreground">{t("pricing.note")}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {PACKAGES.map((p) => (
              <Card key={p.name} className="transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between gap-3 text-lg sm:text-xl">
                    <span className="truncate">{p.name}</span>
                    <span className="text-emerald-700 whitespace-nowrap">₹{p.price}/kg</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">{t("pricing.planMeta.upTo")} {p.garments} {t("pricing.planMeta.garments")} • {p.turnaround} {t("pricing.planMeta.turnaround")}</div>
                  <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Button asChild className="mt-4 w-full">
                    <a
                      href={whatsappLink(`I'd like the ${p.name} plan (up to ${p.garments} garments).`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Choose on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <a href={whatsappLink("Hi, I have a custom pricing question.")} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
