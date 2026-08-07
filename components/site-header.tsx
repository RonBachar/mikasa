"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/nav";
import { Logo } from "./logo";
import { MenuIcon, CloseIcon, ChevronDownIcon } from "./icons";

const RESERVE_HREF = "/contact";
const RESERVE_LABEL = "להזמנת חייגו עכשיו";

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
      className="sticky top-0 z-50"
      style={{
        background: scrolled ? "#ffffff" : "var(--color-cream)",
        borderBottom: scrolled
          ? "1px solid var(--color-line)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 12px rgba(43,38,32,0.06)" : "none",
        transition:
          "background-color 0.45s cubic-bezier(0.22, 0.61, 0.36, 1), border-color 0.45s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.45s cubic-bezier(0.22, 0.61, 0.36, 1)",
      }}
    >
      <div className="container-content flex flex-row-reverse lg:flex-row items-center justify-between gap-4 py-3.5 lg:py-4">
        <Logo />

        {/* Desktop nav: slim elegant text links (Almaris) */}
        <nav aria-label="ניווט ראשי" className="hidden lg:flex items-center gap-6 xl:gap-8">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`nav-link inline-flex items-center gap-1 ${isActive(item.href) ? "is-active" : ""}`}
                >
                  {item.label}
                  <ChevronDownIcon className="opacity-60" />
                </Link>
                <div className="nav-dropdown">
                  <ul
                    className="min-w-52 overflow-hidden bg-white"
                    style={{
                      borderRadius: 4,
                      boxShadow: "0 4px 18px rgba(43, 38, 32, 0.12)",
                    }}
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="nav-dropdown-link">
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
                className={`nav-link ${isActive(item.href) ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Compact gold CTA — Almaris BOOK NOW proportions */}
        <div className="hidden lg:block">
          <Link href={RESERVE_HREF} className="btn btn-primary">
            {RESERVE_LABEL}
          </Link>
        </div>

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
                    className="block py-3 text-lg font-light transition-colors hover:bg-[--color-gold] hover:text-white rounded-[12px] px-3"
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
                            className="block py-2.5 px-3 rounded-[12px] font-light transition-colors hover:bg-[--color-gold] hover:text-white text-[--color-ink-soft]"
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
