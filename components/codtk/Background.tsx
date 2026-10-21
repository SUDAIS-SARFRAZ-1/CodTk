// Persistent background layer (design system BackgroundSystem): dot matrix, tone-following haze and
// mono code fragments on four parallax depths. <Motion /> moves them and sets data-tone on scroll.
const FRAGS = ["{ }", "</>", "API", "01", "await", "=>", "GET /v1", "200 OK", "{ ok: true }", "npm run build", "0x1F", "SELECT *", "docker push", "git commit", "[ ]", "&&"];
const DEPTHS = [0.06, 0.12, 0.2, 0.28];

// Same deterministic sequence as the system, so positions match its previews.
let s = 7;
const PLACED = FRAGS.map((text, i) => {
  s = (s * 9301 + 49297) % 233280;
  const d = DEPTHS[i % 4];
  return { text, d, x: ((s / 233280) * 92).toFixed(1), y: (i * 137) % 100 };
});

export function Background() {
  return (
    <div className="ctk-bg" aria-hidden="true" data-bg>
      <div className="ctk-bg__grid" data-grid />
      <div className="ctk-bg__blob b1" />
      <div className="ctk-bg__blob b2" />
      <div className="ctk-bg__code">
        {PLACED.map((f) => (
          <span
            key={f.text}
            data-depth={f.d}
            data-x={f.x}
            data-y={f.y}
            style={{ fontSize: Math.round(11 + f.d * 30), opacity: +(0.05 + f.d * 0.2).toFixed(3) }}
          >
            {f.text}
          </span>
        ))}
      </div>
    </div>
  );
}
