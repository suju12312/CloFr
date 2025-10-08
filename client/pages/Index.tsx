import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { whatsappLink, SITE } from "@/lib/site";
import { motion } from "framer-motion";
import { CalendarCheck, Truck, Sparkles, ShieldCheck, Leaf, Droplets, Shirt, Footprints, Clock, Settings, Zap, MessageSquare } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Index() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100 via-white to-teal-100 dark:from-emerald-900/30 dark:via-slate-900 dark:to-teal-900/20" />
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-300/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-teal-300/40 blur-3xl animate-pulse" />
        <div className="container mx-auto px-4 pt-12 pb-16 grid gap-8 md:grid-cols-2 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium ring-1 ring-emerald-200">
              {t("home.badge")}
            </div>
            <motion.h1 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight" variants={fadeUp} transition={{ delay: 0.1 }}>
              {t("home.title")}
            </motion.h1>
            <motion.p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-xl break-words" variants={fadeUp} transition={{ delay: 0.2 }}>
              {t("home.desc")}
            </motion.p>
            <motion.div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" variants={fadeUp} transition={{ delay: 0.3 }}>
              <Button asChild size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                <a href={whatsappLink(`Hi ${SITE.name}, I want to place a laundry order.`)} target="_blank" rel="noreferrer">{t("common.orderWhatsApp")}</a>
              </Button>
              <Button asChild size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <a href="/pricing">View Pricing</a>
              </Button>
              <Button asChild size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                <a href="/services">{t("common.seeServices")}</a>
              </Button>
            </motion.div>
            <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
              <li>• {t("common.freePickup")}</li>
              <li>• {t("common.ecoFriendly")}</li>
              <li>• {t("common.turnaround")}</li>
            </ul>
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative rounded-2xl border bg-white shadow-xl p-6 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <motion.div whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 transition-all duration-300 hover:shadow-lg hover:border-emerald-300">
                    <CardContent className="p-4">
                    <div className="text-3xl font-extrabold text-emerald-700">+50</div>
                    <div className="text-xs text-emerald-800/80 font-medium">{t("home.metrics.washedWeekly")}</div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="bg-gradient-to-br from-teal-50 to-teal-100 transition-all duration-300 hover:shadow-lg hover:border-teal-300">
                    <CardContent className="p-4">
                    <div className="text-3xl font-extrabold text-teal-700">98%</div>
                    <div className="text-xs text-teal-800/80 font-medium">{t("home.metrics.onTime")}</div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 transition-all duration-300 hover:shadow-lg hover:border-cyan-300">
                    <CardContent className="p-4">
                    <div className="text-3xl font-extrabold text-cyan-700">24h</div>
                    <div className="text-xs text-cyan-800/80 font-medium">{t("home.metrics.expressOption")}</div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="bg-gradient-to-br from-sky-50 to-sky-100 transition-all duration-300 hover:shadow-lg hover:border-sky-300">
                    <CardContent className="p-4">
                    <div className="text-3xl font-extrabold text-sky-700">4.5★</div>
                    <div className="text-xs text-sky-800/80 font-medium">{t("home.metrics.rating")}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center">{t("home.how.title")}</h2>
          <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
              { Icon: CalendarCheck, key: "s1" },
              { Icon: Droplets, key: "s2" },
              { Icon: Truck, key: "s3" },
            ].map(({ Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border bg-card p-5 sm:p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md text-center flex flex-col items-center"

              >
                <div className="h-11 w-11 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg">{t(`home.how.${key}.t`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`home.how.${key}.d`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center">{t("home.why.title")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[{ Icon: Leaf, key: "eco" }, { Icon: ShieldCheck, key: "trust" }, { Icon: Sparkles, key: "finish" }, { Icon: Truck, key: "door" }].map(({ Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="rounded-xl border bg-card dark:bg-slate-800 p-6 text-center shadow-sm transition-shadow hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600"
              >
                <div className="mx-auto h-11 w-11 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 grid place-items-center"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-4 font-semibold">{t(`home.why.${key}.t`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`home.why.${key}.d`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("home.customize.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.customize.desc")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Clock, key: "timing" },
              { Icon: Settings, key: "service" },
              { Icon: Zap, key: "priority" },
              { Icon: MessageSquare, key: "preferences" }
            ].map(({ Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border bg-white dark:bg-slate-800 p-6 text-center shadow-sm transition-all hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600"
              >
                <div className="mx-auto h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 grid place-items-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(`home.customize.options.${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`home.customize.options.${key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <a href={whatsappLink(`Hi ${SITE.name}, I want to choose my laundry service.`)} target="_blank" rel="noreferrer">
                Choose Your Service
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("home.popular")}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[{ Icon: Shirt, name: "Laundry" }, { Icon: Droplets, name: "Dry Cleaning" }, { Icon: Sparkles, name: "Ironing" }, { Icon: Footprints, name: "Footwear Care" }].map(({ Icon, name }, i) => (
                  <motion.a key={name} href="/services" whileHover={{ scale: 1.03 }} className="rounded-lg border p-4 hover:shadow-sm">
                    <div className="h-9 w-9 rounded-md bg-emerald-100 text-emerald-700 grid place-items-center"><Icon className="h-5 w-5" /></div>
                    <div className="mt-2 text-sm font-medium">{name}</div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("home.faq")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>Pickup and delivery charges?</AccordionTrigger>
                    <AccordionContent>Pickup and delivery are free within our service area.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>How fast is express?</AccordionTrigger>
                    <AccordionContent>Express service delivers within 24 hours for eligible items.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>Do you clean shoes?</AccordionTrigger>
                    <AccordionContent>Yes — sneaker cleaning, deep clean, polish, and leather care.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 p-8 md:p-12 text-center shadow-lg"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("home.cta.title")}</h3>
            <p className="mt-2 text-muted-foreground text-lg max-w-2xl mx-auto">{t("home.cta.desc")}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <a href={whatsappLink(`Hi ${SITE.name}, please schedule a pickup for me.`)} target="_blank" rel="noreferrer">{t("common.bookWhatsApp")}</a>
              </Button>
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
