/**
 * Emits a JSON-LD block.
 *
 * `<` is escaped so a stray "</script>" inside any string value cannot close
 * the tag early and turn the rest of the payload into live markup. The values
 * here are all ours, but this is the one place where an unescaped content
 * string would become an injection, and content is edited by hand.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
