"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/nav";
import { Logo } from "./logo";
import { MenuIcon, CloseIcon, ChevronDownIcon } from "./icons";

const RESERVE_HREF = "/contact";
const RESERVE_LABEL = "להזמנת סוויטה";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

  return (
    <header
      className="sticky top-0 z-50 transition-all"
      style={{
        background: "var(--color-cream)",
        borderBottom: scrolled
          ? "1px solid var(--color-line)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 12px rgba(43,38,32,0.06)" : "none",
      }}
    >
      <div className="container-content flex flex-row-reverse lg:flex-row items-center justify-between gap-4 py-4">
        <Logo />

        {/* Desktop nav: plain elegant text links */}
        <nav aria-label="ניווט ראשי" className="hidden lg:flex items-center gap-7">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 py-2 tracking-wide transition-colors"
                  style={{ color: isActive(item.href) ? "var(--color-gold)" : "var(--color-ink)" }}
                >
                  {item.label}
                  <ChevronDownIcon className="opacity-70" />
                </Link>
                {/* Dropdown panel: white, soft radius, gold-row hover */}
                <div className="absolute top-full start-0 pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 focus-within:opacity-100 focus-within:visible transition-all duration-200">
                  <ul
                    className="min-w-56 overflow-hidden bg-white"
                    style={{
                      border: "1px solid var(--color-line)",
                      borderRadius: "6px",
                      boxShadow: "0 12px 34px rgba(43,38,32,0.14)",
                    }}
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-5 py-3.5 text-[--color-ink] transition-colors duration-150 hover:bg-[--color-gold] hover:text-white"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 tracking-wide transition-colors hover:text-[--color-gold]"
                style={{ color: isActive(item.href) ? "var(--color-gold)" : "var(--color-ink)" }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Reservation button: clean gold rectangle, text only */}
        <div className="hidden lg:block">
          <Link href={RESERVE_HREF} className="btn btn-primary">
            {RESERVE_LABEL}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2"
          style={{ color: "var(--color-ink)" }}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden"
          style={{ borderTop: "1px solid var(--color-line)", background: "var(--color-cream)" }}
        >
          <nav aria-label="ניווט נייד" className="container-content py-5">
            <ul className="flex flex-col">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3.5 text-lg transition-colors hover:bg-[--color-gold] hover:text-white rounded-[6px] px-3"
                    style={{ color: isActive(item.href) ? "var(--color-gold)" : "var(--color-ink)" }}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="ps-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block py-2.5 px-3 rounded-[6px] transition-colors hover:bg-[--color-gold] hover:text-white text-[--color-ink-soft]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link href={RESERVE_HREF} className="btn btn-primary mt-5 w-full">
              {RESERVE_LABEL}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
