import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MEN_RATES, WOMEN_RATES, HOUSEHOLD_RATES, FOOTWEAR_RATES, WOOLEN_RATES, BAGS_RATES, PACKAGES } from "@/lib/pricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { whatsappLink, SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
async function downloadPricingPdf() {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const doc = new jsPDF({ unit: "pt" });
  const margin = 36;
  let y = margin;
  const domain = "clofr.online";
  const formatVal = (v: any, isLabel: boolean) => {
    if (isLabel) return v;
    if (v === undefined || v === null || v === "" || v === "-") return "-";
    return `Rs ${v}`; // Use ASCII to avoid glyph issues in PDFs
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`${SITE.name} - Price List`, margin, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`WhatsApp: +${SITE.whatsappNumber.replace(/^91/, "91 ")}`, margin, y);
  y += 22;

  const sections: Array<{ title: string; headers: string[]; rows: any[] }> = [
    {
      title: "Men",
      headers: ["Item", "Wash & Fold", "Dry Clean", "Iron", "Steam Iron"],
      rows: MEN_RATES.map((r) => [r.item, r.washFold ?? "-", r.dryClean ?? "-", r.iron ?? "", r.steamIron ?? "-"]),
    },
    {
      title: "Women",
      headers: ["Item", "Wash & Fold", "Dry Clean", "Iron", "Steam Iron"],
      rows: WOMEN_RATES.map((r) => [r.item, r.washFold ?? "-", r.dryClean ?? "-", r.iron ?? "", r.steamIron ?? "-"]),
    },
    {
      title: "Household",
      headers: ["Item", "Wash & Fold", "Dry Clean"],
      rows: HOUSEHOLD_RATES.map((r) => [r.item, r.washFold ?? "-", r.dryClean ?? "-"]),
    },
    {
      title: "Footwear",
      headers: ["Item", "Cleaning", "Deep Clean", "Polish"],
      rows: FOOTWEAR_RATES.map((r) => [r.item, r.washFold ?? "-", r.dryClean ?? "-", r.iron ?? "-"]),
    },
    {
      title: "Woolen",
      headers: ["Item", "Dry Clean", "Steam Iron"],
      rows: WOOLEN_RATES.map((r) => [r.item, r.washFold ?? "-", r.dryClean ?? "-", r.iron ?? "-"]),
    },
    {
      title: "Bags",
      headers: ["Item", "Dry Clean"],
      rows: BAGS_RATES.map((r) => [r.item, r.washFold ?? "-", r.dryClean ?? "-", r.iron ?? "-"]),
    },
    
  ];

  sections.forEach((section, idx) => {
    autoTable(doc, {
      startY: y,
      head: [[section.title.toUpperCase(), ...new Array(section.headers.length - 1).fill("")]],
      styles: { font: "helvetica", fontSize: 11 },
      headStyles: { fillColor: [16, 185, 129], textColor: 255, halign: "left" },
      body: [],
      theme: "plain",
      margin: { left: margin, right: margin },
      didDrawPage: (data) => {
        // no-op
      },
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 6,
      head: [section.headers],
      body: section.rows.map((row) => row.map((v: any, i: number) => formatVal(v, i === 0))),
      styles: { font: "helvetica", fontSize: 10, lineWidth: 0.5, lineColor: [229, 231, 235] },
      headStyles: { fillColor: [241, 245, 249], textColor: 0, halign: "left" },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      margin: { left: margin, right: margin },
    });

    y = (doc as any).lastAutoTable.finalY + 20;
    if (idx === sections.length - 1) {
      doc.setFontSize(9.5);
      doc.text("Note: Prices are indicative and may vary.", margin, y);
    }
  });

  // Footer with domain and page numbers
  const pageCount = (doc as any).getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(100);
    const footerText = `${domain}  •  Generated on ${new Date().toLocaleDateString()}`;
    doc.text(footerText, margin, (doc as any).internal.pageSize.getHeight() - 16);
    const pageLabel = `Page ${i} of ${pageCount}`;
    const pageWidth = (doc as any).internal.pageSize.getWidth();
    doc.text(pageLabel, pageWidth - margin, (doc as any).internal.pageSize.getHeight() - 16, { align: "right" });
  }

  doc.save("CloFr-price-list.pdf");
}

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
        <div key={r.item} className="rounded-lg border bg-card dark:bg-slate-800 p-3">
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
                <div className="mb-4 flex justify-end">
                  <Button variant="outline" onClick={downloadPricingPdf}>Download Price List (PDF)</Button>
                </div>
                <Tabs defaultValue="men">
                  <TabsList
                    className="flex gap-2 overflow-x-auto max-w-full snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    <TabsTrigger value="men" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.men")}</TabsTrigger>
                    <TabsTrigger value="women" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.women")}</TabsTrigger>
                    <TabsTrigger value="household" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.household")}</TabsTrigger>
                    <TabsTrigger value="footwear" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.footwear")}</TabsTrigger>
                    <TabsTrigger value="woolen" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.woolen")}</TabsTrigger>
                    <TabsTrigger value= "bags" className="px-3 py-1.5 text-sm snap-start">{t("pricing.tabs.bags")}</TabsTrigger>
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
                  <TabsContent value="woolen" className="mt-4">
                    <RatesListMobile data={WOOLEN_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                    <RatesTable data={WOOLEN_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                  </TabsContent>
                  <TabsContent value="bags" className="mt-4">
                    <RatesListMobile data={BAGS_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                    <RatesTable data={BAGS_RATES} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                  </TabsContent>
                </Tabs>
                <p className="mt-3 text-xs text-muted-foreground">{t("pricing.note")}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                  <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl">
                    <a href={whatsappLink("Hi, I have a custom pricing question.")} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
                  </Button>
                  <Button size="lg" asChild className="bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-lg hover:shadow-xl">
                    <a href="/services">See Services</a>
                  </Button>
                  <Button size="lg" asChild className="bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-lg hover:shadow-xl">
                    <a href="/contact">Get in Touch</a>
                  </Button>
                </div>
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
                  <Button asChild className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl">
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


      </div>
    </section>
  );
}
