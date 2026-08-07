import { reviews } from "@/content/reviews";
import { siteConfig } from "@/lib/site-config";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} מתוך 5 כוכבים`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden
          fill={i < rating ? "var(--color-gold)" : "none"}
          stroke="var(--color-gold)" strokeWidth="1.5">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsGrid() {
  const { ratingValue, reviewCount } = siteConfig.reviews;
  return (
    <div>
      {/* Aggregate */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center gap-3">
          <span className="font-display text-4xl text-[--color-ink]">{ratingValue}</span>
          <Stars rating={Math.round(ratingValue)} />
        </div>
        <p className="mt-2 text-[--color-ink-soft]">
          {ratingValue} מתוך 5, מבוסס על {reviewCount}+ ביקורות בגוגל
        </p>
        {siteConfig.social.googleReviews ? (
          <a
            href={siteConfig.social.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-sm font-semibold text-[--color-ink-soft] underline decoration-[--color-gold] underline-offset-4"
          >
            לצפייה בכל הביקורות בגוגל
          </a>
        ) : (
          <span className="mt-3 text-xs text-[--color-ink-soft]">
            {/* TODO owner: קישור לפרופיל הביקורות בגוגל */}
          </span>
        )}
      </div>

      {/* Cards */}
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <li key={i} className="card p-6 flex flex-col gap-3">
            <Stars rating={r.rating} />
            <p className="text-[--color-ink] leading-relaxed flex-1">״{r.text}״</p>
            <div className="text-sm text-[--color-ink-soft]">
              <span className="font-semibold text-[--color-ink-soft]">{r.author}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
