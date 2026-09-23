import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { RESTAURANT_URL } from "@/lib/public-site";
import { WA_URL } from "@/lib/casitas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casitas QuinuaQ — Quédate un poco más. Quinua, Ayacucho" },
      {
        name: "description",
        content:
          "Casitas de campo en Quinua, Ayacucho. El paisaje, la cocina de QuinuaQ y tiempo para desconectar. Conoce nuestros alojamientos y consulta tu estancia.",
      },
      { property: "og:title", content: "Casitas QuinuaQ — Quédate un poco más" },
      { property: "og:description", content: "Campo, cocina y hospitalidad en Quinua, Ayacucho." },
      { property: "og:image", content: "/images/atardecer-quinuaq.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="qq-public">
      <SiteNav />
      <main id="contenido" tabIndex={-1}>
        <section className="qq-stay-hero" aria-labelledby="stay-title">
          <img
            src="/images/atardecer-quinuaq.png"
            alt="El sol cae sobre el valle de Quinua, visto desde el arco de QuinuaQ"
            fetchPriority="high"
            width="1920"
            height="1280"
          />
          <div className="qq-wrap qq-stay-hero-content">
            <p className="qq-eyebrow">Casitas de campo · Quinua, Ayacucho</p>
            <h1 id="stay-title">
              El paisaje invita.
              <br />
              <em>Tú decides quedarte.</em>
            </h1>
            <p>
              Una buena mesa. El aire del campo.
              <br />Y tiempo para volver a lo esencial.
            </p>
            <div className="qq-actions">
              <Link to="/casitas" className="qq-button qq-button-ivory">
                Descubre las casitas <span aria-hidden="true">↗</span>
              </Link>
              <a href="#el-lugar" className="qq-text-link">
                Conoce el lugar <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="qq-wrap qq-hero-caption">
            <span>QuinuaQ Casitas</span>
            <span>El otro lado de una buena mesa.</span>
          </div>
        </section>
        <section className="qq-wrap qq-intro" id="el-lugar">
          <p className="qq-eyebrow">El gusto de quedarse</p>
          <h2>
            Ayacucho se disfruta
            <br />
            <em>sin mirar el reloj.</em>
          </h2>
          <div>
            <p>
              Casitas de campo en Quinua. Elige tu estancia, selecciona tus fechas y coordinemos tu visita.
            </p>
            <Link to="/casitas" className="qq-text-link">
              Encuentra tu estancia <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="qq-stay-selection qq-wrap" aria-labelledby="selection-title">
          <div className="qq-section-top">
            <div>
              <p className="qq-eyebrow">A tu manera</p>
              <h2 id="selection-title">Un lugar para cada viaje.</h2>
            </div>
            <Link to="/casitas" className="qq-text-link">
              Ver todas las casitas <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="qq-selection-grid">
            <Link to="/casitas" search={{ category: "couples" }} className="qq-selection-link">
              <span className="qq-selection-number">01</span>
              <div>
                <p>Para dos</p>
                <h3>Una pausa compartida.</h3>
                <span>Casitas y habitaciones para 1 a 2 personas</span>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/casitas" search={{ category: "family" }} className="qq-selection-link">
              <span className="qq-selection-number">02</span>
              <div>
                <p>En familia</p>
                <h3>Más tiempo juntos.</h3>
                <span>Casita Kallen para hasta 4 personas</span>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/casitas"
              search={{ category: "groups", guests: 5 }}
              className="qq-selection-link"
            >
              <span className="qq-selection-number">03</span>
              <div>
                <p>Entre amigos</p>
                <h3>El campo se comparte.</h3>
                <span>Habitación dúplex para grupos de hasta 6</span>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="qq-wrap py-24 text-center" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', marginTop: '4rem', marginBottom: '4rem' }}>
          <p className="font-serif text-3xl md:text-4xl text-[var(--text-ivory)] mb-6">
            La cocina de QuinuaQ es parte de la experiencia.
          </p>
          <a href={RESTAURANT_URL} className="qq-text-link inline-flex">
            Conoce el restaurante <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="qq-stay-contact" id="contacto">
          <div className="qq-wrap">
            <div>
              <p className="qq-eyebrow">Tu próxima escapada</p>
              <h2>Nos vemos en Quinua.</h2>
              <p>Cuéntanos cuándo vienes y con quién. Te ayudamos a elegir tu estancia.</p>
              <div className="mt-8 space-y-2 text-[var(--text-muted)]">
                <p>📍 Jr. 9 de Diciembre s/n, Lorenzayocc, Quinua</p>
                <p>📞 +51 946 393 256</p>
                <p>✉️ reservas@quinuaq.com</p>
              </div>
            </div>
            <div className="qq-actions">
              <Link to="/casitas" className="qq-button">
                Ver las casitas <span aria-hidden="true">↗</span>
              </Link>
              <a href={WA_URL} target="_blank" rel="noreferrer" className="qq-button qq-button-outline">
                Escríbenos por WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
