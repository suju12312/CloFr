import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { SITE } from "@/lib/site";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { Instagram, Phone, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-foreground/80 hover:text-foreground hover:bg-accent"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function Layout() {
  const { t, lang, setLang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-emerald-50 dark:from-slate-900 dark:to-slate-950">
      {/* Reserve space so content doesn't go under sticky header */}
      <div aria-hidden className="h-16 md:h-20" />
      <header className="fixed inset-x-0 top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-white/80 dark:bg-slate-900/80 border-b dark:border-slate-700">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2 font-extrabold text-xl">
              <span className="inline-block h-8 w-8 rounded-lg bg-emerald-500 text-white grid place-items-center shadow-sm">CF</span>
              <span>{SITE.name}</span>
            </a>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/" label={t("nav.home")} />
            <NavItem to="/services" label={t("nav.services")} />
            <NavItem to="/pricing" label={t("nav.pricing")} />
            <NavItem to="/contact" label={t("nav.contact")} />
          </nav>
          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Select value={lang} onValueChange={(v) => setLang(v as any)}>
              <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="mr">मराठी</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile toggles */}
          <div className="md:hidden flex items-center gap-2">
            <Select
              value={lang}
              onValueChange={(v) => {
                setLang(v as any);
                setMobileOpen(false);
              }}
            >
              <SelectTrigger className="w-[90px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="hi">HI</SelectItem>
                <SelectItem value="mr">MR</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" aria-label="Toggle menu" onClick={() => setMobileOpen((v) => !v)}>
              {/* hamburger */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
        {/* Mobile menu sheet */}
        {mobileOpen && (
          <>
            {/* backdrop */}
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 top-14 z-40 bg-black/30 md:hidden" />
            <div className="fixed inset-x-0 top-14 z-50 md:hidden border-b bg-background/95 supports-[backdrop-filter]:backdrop-blur shadow-sm">
              <div className="container mx-auto px-4 py-3 space-y-3">
                <nav className="flex flex-col gap-1">
                <NavItem to="/" label={t("nav.home")} onClick={() => setMobileOpen(false)} />
                <NavItem to="/services" label={t("nav.services")} onClick={() => setMobileOpen(false)} />
                <NavItem to="/pricing" label={t("nav.pricing")} onClick={() => setMobileOpen(false)} />
                <NavItem to="/contact" label={t("nav.contact")} onClick={() => setMobileOpen(false)} />
                </nav>
              </div>
            </div>
          </>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
          <div>
            <div className="font-bold text-lg">{SITE.name}</div>
            <p className="text-sm text-muted-foreground">{SITE.tagline}</p>
          </div>
          <div className="text-sm">
            <div className="font-semibold mb-2">{t("footer.quick")}</div>
            <ul className="space-y-1">
              <li><a className="hover:underline" href="/services">{t("nav.services")}</a></li>
              <li><a className="hover:underline" href="/pricing">{t("nav.pricing")}</a></li>
              <li><a className="hover:underline" href="/contact">{t("nav.contact")}</a></li>
            </ul>
          </div>
          <div className="text-sm">
            <div className="font-semibold mb-2">{t("footer.contact")}</div>
            <p className="mb-1 flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-600" aria-hidden />
              <span>{SITE.phoneDisplay}</span>
            </p>
            <p className="flex items-center gap-2">
              <span aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4 text-emerald-600 fill-current">
                  <path d="M19.11 17.53c-.27-.14-1.57-.78-1.81-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.41-2.15-1.31-.79-.7-1.32-1.57-1.47-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.46-.16 0-.34-.02-.52-.02s-.47.07-.71.34c-.24.27-.93.91-.93 2.22s.95 2.58 1.08 2.76c.13.18 1.88 2.87 4.56 4.02.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.57-.64 1.79-1.25.22-.62.22-1.15.15-1.25-.07-.11-.24-.18-.51-.31z"/>
                  <path d="M26.88 5.12C24.13 2.37 20.66 1 17 1S9.87 2.37 7.12 5.12C4.37 7.87 3 11.34 3 15c0 2.49.68 4.92 1.97 7.05L3 31l9.16-1.93C14.24 30.33 15.61 31 17 31c3.66 0 7.13-1.37 9.88-4.12C29.63 24.13 31 20.66 31 17s-1.37-7.13-4.12-9.88zM17 28.5c-1.19 0-2.35-.27-3.44-.79l-.41-.2-5.42 1.14 1.13-5.29-.22-.35C7.14 21.04 6.5 18.95 6.5 16 6.5 9.65 11.65 4.5 18 4.5S29.5 9.65 29.5 16 24.35 28.5 17 28.5z"/>
                </svg>
              </span>
              <a className="hover:underline" target="_blank" rel="noreferrer" href={`https://wa.me/${SITE.whatsappNumber}`}>{t("footer.chatNow")}</a>
            </p>
            <div className="mt-3">
              <div className="font-semibold mb-1">{t("footer.social")}</div>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com/freshfold" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-accent">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4 fill-current text-emerald-600" aria-hidden>
                    <path d="M19.11 17.53c-.27-.14-1.57-.78-1.81-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.41-2.15-1.31-.79-.7-1.32-1.57-1.47-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.46-.16 0-.34-.02-.52-.02s-.47.07-.71.34c-.24.27-.93.91-.93 2.22s.95 2.58 1.08 2.76c.13.18 1.88 2.87 4.56 4.02.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.57-.64 1.79-1.25.22-.62.22-1.15.15-1.25-.07-.11-.24-.18-.51-.31z"/>
                    <path d="M26.88 5.12C24.13 2.37 20.66 1 17 1S9.87 2.37 7.12 5.12C4.37 7.87 3 11.34 3 15c0 2.49.68 4.92 1.97 7.05L3 31l9.16-1.93C14.24 30.33 15.61 31 17 31c3.66 0 7.13-1.37 9.88-4.12C29.63 24.13 31 20.66 31 17s-1.37-7.13-4.12-9.88zM17 28.5c-1.19 0-2.35-.27-3.44-.79l-.41-.2-5.42 1.14 1.13-5.29-.22-.35C7.14 21.04 6.5 18.95 6.5 16 6.5 9.65 11.65 4.5 18 4.5S29.5 9.65 29.5 16 24.35 28.5 17 28.5z"/>
                  </svg>
                </a>
                <div aria-label="Phone" className="inline-flex h-8 w-8 items-center justify-center rounded-full border">
                  <Phone className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
      </footer>

      <WhatsAppFAB />
    </div>
  );
}
