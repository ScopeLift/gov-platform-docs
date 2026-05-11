type EmbedProps = { url: string };

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.endsWith("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.endsWith("loom.com") && u.pathname.startsWith("/share/")) {
      return url.replace("/share/", "/embed/");
    }
    if (u.hostname.endsWith("drive.google.com") && /\/file\/d\/[^/]+/.test(u.pathname)) {
      return url.replace(/\/view.*$/, "/preview");
    }
    return url;
  } catch {
    return url;
  }
}

export function Embed({ url }: EmbedProps) {
  const src = toEmbedUrl(url);
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, margin: "1.5rem 0" }}>
      <iframe
        src={src}
        title="Embedded content"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0, borderRadius: 8 }}
      />
    </div>
  );
}
