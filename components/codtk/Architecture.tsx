import Image from "next/image";
import archImg from "@/public/sections/architecture.png";

const PARTS = [
  { n: "01", k: "web", t: "Web application", s: "Next.js · server-rendered" },
  { n: "02", k: "mobile", t: "Mobile app", s: "React Native · iOS and Android" },
  { n: "03", k: "api", t: "API layer", s: "Node.js · REST APIs · auth" },
  { n: "04", k: "data", t: "Data", s: "PostgreSQL · Redis cache" },
  { n: "05", k: "cloud", t: "Cloud and delivery", s: "AWS · Docker · CI/CD" },
];

export function Architecture() {
  return (
    <section className="ctk-sec ctk-arch" aria-labelledby="arch-t">
      <div className="ctk-wrap">
        <div className="ctk-head ctk-head--split">
          <p className="ctk-kicker rv">How we build</p>
          <h2 id="arch-t" className="ctk-d2 rv" data-d={1}>
            Every layer of your product, <span className="ctk-em">one team.</span>
          </h2>
          <p className="ctk-p rv" data-d={2}>
            Most products need a web app, a mobile app, an API, a database and somewhere to run. We design and build
            them together, so the pieces fit from day one.
          </p>
        </div>
        <div className="ctk-arch__grid">
          <div className="ctk-arch__panel rv" data-d={1}>
            <div className="ctk-arch__bar">
              <h3 className="ctk-h4">Your product, layer by layer</h3>
            </div>
            <ol className="ctk-layers">
              {PARTS.map((p) => (
                <li key={p.k}>
                  <span className="ctk-layers__n">{p.n}</span>
                  <span>
                    <b>{p.t}</b>
                    <small>{p.s}</small>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="ctk-arch__frame rv" data-d={2}>
            <Image
              src={archImg}
              alt="Example product architecture: a web dashboard and a mobile app connected through an API gateway to a PostgreSQL database hosted on AWS"
              placeholder="blur"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="ctk-arch__img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
