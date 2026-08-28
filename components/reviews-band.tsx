import { getReviews, initialsOf } from "@/lib/google-reviews";

/**
 * Real Google reviews, rendered as crate-label grade slips.
 *
 * Deliberately NOT the testimonials carousel this site used to ship: that one
 * displayed six unapproved placeholder quotes as if genuine. Everything here
 * comes from the live Google profile, and when Google returns nothing the
 * section renders nothing at all.
 *
 * Reviewers are shown as stamped monograms rather than Google profile photos.
 * The Places terms forbid re-hosting those images, hot-linking them makes the
 * page depend on a third-party host, and the avatars break as people change
 * or delete their accounts. Initials in a stamp also read as part of this
 * world instead of a pasted-in Google widget.
 *
 * No Review or AggregateRating structured data is emitted here on purpose:
 * Google's own rich-results guidelines exclude ratings a site collects from
 * a third-party source about itself, so marking these up would risk a manual
 * action rather than earn stars in search.
 */

/** Local to this file by design, so components/icons.tsx stays untouched. */
function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9L12 2.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stars({ rating, label }: { rating: number; label: string }) {
  const rounded = Math.round(rating);
  return (
    <span className="reviews__stars" role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rounded} />
      ))}
    </span>
  );
}

export async function ReviewsBand() {
  const data = await getReviews();

  // No key, no reviews, or a failed request: show nothing rather than
  // anything invented. This is the whole point of the component.
  if (!data) return null;

  const { reviews, rating, totalCount, googleUrl } = data;

  return (
    <section className="reviews on-dark" aria-labelledby="reviews-heading">
      <div className="container-content">
        <div className="reviews__head">
          <span className="eyebrow">מה כותבים עלינו בגוגל</span>
          <h2 id="reviews-heading" className="text-3xl mt-3">
            זוגות שכבר היו כאן
          </h2>
          <div className="hairline-short mt-4" />

          {rating !== null && (
            <div className="reviews__aggregate">
              <span className="reviews__aggregate-value" dir="ltr">
                {rating.toFixed(1)}
              </span>
              <span className="reviews__aggregate-meta">
                <Stars rating={rating} label={`דירוג ממוצע ${rating.toFixed(1)} מתוך 5`} />
                {totalCount !== null && (
                  <span className="reviews__aggregate-count">
                    מתוך {totalCount} ביקורות בגוגל
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        <ul className="reviews__grid">
          {reviews.map((r) => (
            <li key={r.id} className="reviews__card">
              {/* No date shown. A guest reading a five-star review does not
                  need to know it was left eight months ago, and a visible age
                  quietly discounts an older review that is just as true.
                  `relativeTime` is still normalised in the data layer in case
                  a future surface wants it. */}
              <div className="reviews__card-head">
                <span className="reviews__monogram" aria-hidden>
                  {initialsOf(r.authorName)}
                </span>
                <span className="reviews__name">{r.authorName}</span>
              </div>

              <Stars rating={r.rating} label={`${r.rating} מתוך 5 כוכבים`} />

              <p className="reviews__text">{r.text}</p>
            </li>
          ))}
        </ul>

        {/* Attribution and link back to the source, as the Places terms require. */}
        <p className="reviews__source">
          כל הביקורות מגיעות ישירות מפרופיל Google של מיקאסה.{" "}
          <a href={googleUrl} target="_blank" rel="noopener noreferrer">
            לקריאת כל הביקורות בגוגל
          </a>
        </p>

      </div>
    </section>
  );
}
