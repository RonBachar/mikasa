"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, type NavItem } from "@/lib/nav";
import { Logo } from "./logo";
import { MenuIcon, CloseIcon, ChevronDownIcon } from "./icons";
import { PhoneCTA } from "./cta";
import { siteConfig } from "@/lib/site-config";

/* Desktop dropdown. Deliberately state-driven rather than a CSS
   `:hover, :focus-within` pair: after a click the focus stays on the link
   inside the panel, so `:focus-within` held the panel open even once the
   pointer had left. State lets pointer-leave, Escape, an outside click and a
   navigation all close it, which is what people expect from a menu. */
function NavDropdown({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const children = item.children ?? [];
  // The parent reads as current whenever one of its pages is the one on screen.
  const active = isActive(item.href) || children.some((c) => isActive(c.href));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      // Tabbing out of the group closes it; moving between the trigger and its
      // own links does not, hence the containment check.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <Link
        ref={triggerRef}
        href={item.href}
        aria-expanded={open}
        aria-haspopup="true"
        className={`nav-link inline-flex items-center gap-1 ${active ? "is-active" : ""}`}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {item.label}
        <ChevronDownIcon
          className="opacity-60 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </Link>
      <div className={`nav-dropdown ${open ? "is-open" : ""}`}>
        <ul
          className="crate-frame min-w-52 overflow-hidden"
          style={{
            background: "var(--color-kraft)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className={`nav-dropdown-link ${isActive(child.href) ? "is-active" : ""}`}
                // Closes even when the click does not change the route (the
                // page you are already on), which a pathname effect would miss.
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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

  const isActive = (href: string) => {
    const base = href.split("#")[0] || "/";
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--color-parchment)",
        borderBottom: scrolled
          ? "2px solid var(--color-timber)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 12px rgba(28,20,13,0.1)" : "none",
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
              <NavDropdown key={item.href} item={item} isActive={isActive} />
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

        {/* Compact gold CTA — Almaris BOOK NOW proportions. The label is the
            number and nothing else (owner's call), so the button dials rather
            than routing to /contact: a bare phone number that opened a page
            instead of placing the call would read as broken on a phone. */}
        <div className="hidden lg:block">
          <PhoneCTA location="header">
            <span dir="ltr" className="tabular-nums">
              {siteConfig.phoneDisplayCompact}
            </span>
          </PhoneCTA>
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
        <>
          {/* Dimmed backdrop. Also the tap target that closes the menu, which
              is what people try first. */}
          <div
            className="lg:hidden fixed inset-0 z-40"
            style={{ background: "rgba(20,16,10,0.5)" }}
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          {/* Absolute, not in flow. As a normal block inside the sticky header
              this panel grew the header and pushed the whole page down instead
              of opening over it. Anchored to the header's bottom edge now, so
              it floats above the content. */}
          <div
            id="mobile-menu"
            className="lg:hidden absolute inset-x-0 top-full z-50 overflow-y-auto"
            style={{
              borderTop: "1px solid var(--color-line)",
              background: "var(--color-cream)",
              boxShadow: "0 12px 28px rgba(20,16,10,0.35)",
              maxHeight: "calc(100dvh - 100%)",
            }}
          >
            <nav aria-label="ניווט נייד" className="container-content py-5">
              <ul className="flex flex-col">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-3 text-lg font-bold transition-colors hover:bg-[--color-cherry] hover:text-white px-3"
                      style={{
                        color:
                          isActive(item.href) ||
                          item.children?.some((c) => isActive(c.href))
                            ? "var(--color-cherry)"
                            : "var(--color-ink)",
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="ps-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-2.5 px-3 font-medium transition-colors hover:bg-[--color-cherry] hover:text-white text-[--color-ink-soft]"
                              style={
                                isActive(child.href)
                                  ? { color: "var(--color-cherry)" }
                                  : undefined
                              }
                              onClick={() => setMenuOpen(false)}
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
              {/* Mirrors the desktop header button, so the number is the
                  call-to-action in both. */}
              <PhoneCTA location="header-mobile" className="mt-5 w-full">
                <span dir="ltr" className="tabular-nums">
                  {siteConfig.phoneDisplayCompact}
                </span>
              </PhoneCTA>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
