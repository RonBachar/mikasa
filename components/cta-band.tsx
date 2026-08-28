import { PhoneCTA, WhatsAppCTA } from "./cta";

/**
 * The site's closing CTA. Dark band, phone + WhatsApp, and it ends every page
 * except /contact (where the whole page is already the ask), so a visitor
 * never reaches the footer without having been offered a way to book.
 *
 * The defaults below are the copy the block ships with; they are defaults
 * precisely so the ask is worded the same everywhere. Pass `title`/`subtitle`
 * only where a page has a genuinely better line.
 */
export function CtaBand({
  title = "בואו נבדוק תאריכים",
  subtitle = "רוצים לדעת אם הסוויטה פנויה בתאריכים שלכם? שלחו הודעה קצרה או התקשרו, ואשמח לעזור.",
  location = "cta-band",
}: {
  title?: string;
  subtitle?: string;
  location?: string;
}) {
  return (
    <section className="on-dark" style={{ background: "var(--color-dark)", color: "var(--color-cream)" }}>
      <div className="hairline" />
      {/* No eyebrow. "מיקאסה, שעל" sat above the heading on every page of a
          site that is already Mikasa's, and it pushed the actual ask down. */}
      <div className="container-content py-20 md:py-24 text-center">
        <h2 className="text-4xl" style={{ color: "var(--color-white)" }}>
          {title}
        </h2>
        <p className="mt-3 text-lg opacity-90 max-w-2xl mx-auto">{subtitle}</p>
        <div className="mt-7 flex flex-wrap gap-4 justify-center">
          <PhoneCTA location={location}>התקשרו עכשיו</PhoneCTA>
          <WhatsAppCTA location={location}>בואו נדבר בוואטסאפ</WhatsAppCTA>
        </div>
      </div>
    </section>
  );
}
