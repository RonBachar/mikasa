import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | צימר מיקאסה",
  description: "מדיניות הפרטיות של אתר צימר מיקאסה, איזה מידע נאסף וכיצד נעשה בו שימוש.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section band="cream" className="!pt-28">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "מדיניות פרטיות", href: "/privacy" }]} />
      <div className="mt-6 max-w-3xl text-[--color-ink] leading-relaxed space-y-5">
        <h1 className="text-4xl">מדיניות פרטיות</h1>
        <div className="hairline-short" />
        <p>
          אנו במיקאסה מכבדים את פרטיותכם. עמוד זה מסביר איזה מידע נאסף באתר וכיצד
          נעשה בו שימוש. באתר אין הזמנה אונליין ואין קליטת פרטי תשלום, וכל תיאום
          מתבצע ישירות בטלפון או בוואטסאפ.
        </p>

        <h2 className="font-display text-2xl text-[--color-ink]">איזה מידע נאסף</h2>
        <p>
          כאשר אתם פונים אלינו בטלפון או בוואטסאפ, אנו מקבלים את המידע שאתם בוחרים
          לשתף, כגון שם, מספר טלפון ופרטי הבקשה. מידע זה משמש אך ורק לצורך תיאום
          החופשה ומענה לפנייתכם.
        </p>

        <h2 className="font-display text-2xl text-[--color-ink]">מידע סטטיסטי ועוגיות</h2>
        <p>
          לצורך שיפור האתר אנו עשויים להשתמש בכלי מדידה סטטיסטיים כגון Google
          Analytics, האוסף מידע אנונימי על השימוש באתר (כגון עמודים נצפים וסוג
          מכשיר). מידע זה אינו מזהה אתכם אישית. ניתן לנהל עוגיות דרך הגדרות הדפדפן.
        </p>

        <h2 className="font-display text-2xl text-[--color-ink]">שירותים של צד שלישי</h2>
        <p>
          לחיצה על כפתור הוואטסאפ מעבירה אתכם לשירות WhatsApp, הכפוף למדיניות
          הפרטיות שלו. כך גם קישורים חיצוניים כגון גוגל מפות. אנו איננו אחראים
          למדיניות הפרטיות של שירותים חיצוניים אלה.
        </p>

        <h2 className="font-display text-2xl text-[--color-ink]">אבטחת מידע ושמירתו</h2>
        <p>
          אנו נוקטים באמצעים סבירים לשמירה על המידע שברשותנו ואיננו מוסרים אותו
          לצדדים שלישיים, למעט כנדרש על פי דין.
        </p>

        <h2 className="font-display text-2xl text-[--color-ink]">יצירת קשר</h2>
        <p>
          לשאלות בנושא פרטיות ניתן לפנות אלינו בטלפון{" "}
          <a href={siteConfig.telHref} dir="ltr" className="tabular-nums underline decoration-[--color-gold] underline-offset-4">
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>

        <p className="text-sm text-[--color-ink-soft]">
          תאריך עדכון: [להשלמה]. מדיניות זו עשויה להתעדכן מעת לעת.
        </p>
      </div>
    </Section>
  );
}
