import { createFileRoute } from "@tanstack/react-router";
import heroValley from "@/assets/hero-valley.jpg";
import roomImg from "@/assets/room.jpg";
import fogataImg from "@/assets/fogata.jpg";
import alpacasImg from "@/assets/alpacas.jpg";
import cocinaImg from "@/assets/cocina.jpg";
import quinuaImg from "@/assets/quinua.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valley Q Lodge — Refugio boutique andino en Quinua | QuinuaQ" },
      {
        name: "description",
        content:
          "Valley Q Lodge, propuesta boutique de Altipacha Hotels en Quinua, Ayacucho. Habitaciones con vista al valle, fogatas, cocina vivencial y turismo con propósito.",
      },
      { property: "og:title", content: "Valley Q Lodge — Refugio andino en Quinua" },
      {
        property: "og:description",
        content:
          "Entre montañas y neblina, un refugio boutique donde el silencio se convierte en descanso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WA = "https://wa.me/51921500056";

const experiences = [
  { title: "Vistas privilegiadas", desc: "Terrazas y habitaciones abiertas al valle, donde el paisaje entra por la ventana." },
  { title: "Fogatas y rituales andinos", desc: "Ceremonias del fuego bajo cielos estrellados, guiadas por la tradición local." },
  { title: "Cocina típica", desc: "Sabores de la sierra servidos con producto de temporada y raíces ancestrales." },
  { title: "Cocina y coctelería vivencial", desc: "Clases inmersivas para cocinar y brindar como en el corazón de los Andes." },
  { title: "Alpacas y arte", desc: "Convive con alpacas y descubre técnicas de artesanos que resguardan Quinua." },
  { title: "Spa · muy pronto", desc: "Un santuario de aguas termales y rituales de bienestar en preparación." },
];

const rates = [
  { name: "Casita Betsy", weekday: 375, weekend: 390, holiday: 420 },
  { name: "Casita Kallen · 4 personas", weekday: 570, weekend: 600, holiday: 650 },
  { name: "Casita Kallen · 2 personas", weekday: 400, weekend: 430, holiday: 520 },
  { name: "Habitación Matrimonial", weekday: 270, weekend: 300, holiday: 320 },
  { name: "Habitación Dúplex · 2 personas", weekday: 300, weekend: 330, holiday: 360, note: "S/. 50 adicional por persona extra" },
];

function Index() {
  return (
    <main className="bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl tracking-tight text-clay">Valley Q</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Lodge</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#experiencias" className="hover:text-clay transition">Experiencias</a>
            <a href="#habitaciones" className="hover:text-clay transition">Habitaciones</a>
            <a href="#quinua" className="hover:text-clay transition">Quinua</a>
            <a href="#proposito" className="hover:text-clay transition">Propósito</a>
            <a href="#contacto" className="hover:text-clay transition">Contacto</a>
          </nav>
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="text-xs md:text-sm px-4 py-2 bg-clay text-primary-foreground rounded-sm hover:bg-ember transition"
          >
            Reservar
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-drift">
          <img
            src={heroValley}
            alt="Valley Q Lodge entre montañas y neblina en Quinua"
            className="w-full h-full object-cover"
            width={1920}
            height={1200}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 max-w-6xl mx-auto text-ivory animate-fade-up">
          <span className="eyebrow text-ivory/80 mb-6">Altipacha Hotels · Quinua, Ayacucho</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
            Un refugio andino <em className="italic text-ivory/90">donde el silencio</em> se convierte en descanso.
          </h1>
          <p className="mt-8 text-lg md:text-xl max-w-xl text-ivory/85 font-light">
            Entre montañas y neblina, nace un lugar para reconectarte con lo esencial.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-ivory text-ink px-8 py-4 rounded-sm hover:bg-clay hover:text-ivory transition-all group"
            >
              Reserva tu estadía
              <span className="group-hover:translate-x-1 transition">→</span>
            </a>
            <a
              href="#experiencias"
              className="inline-flex items-center gap-3 border border-ivory/40 text-ivory px-8 py-4 rounded-sm hover:bg-ivory/10 transition"
            >
              Descubre el lodge
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-28 md:py-40 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <span className="eyebrow">Bienvenidos a</span>
            <h2 className="mt-4 font-serif text-5xl md:text-6xl text-clay">Valley Q</h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg leading-relaxed text-foreground/80 font-light">
            <p>
              En el corazón de Quinua, donde la historia del Perú se encuentra con la naturaleza más pura,
              nace <span className="text-clay">Valley Q Lodge</span>. Una propuesta boutique by Altipacha Hotels,
              diseñada para quienes buscan desconectar del ruido, descansar en confort y vivir una experiencia
              auténtica con raíces andinas.
            </p>
            <p className="italic font-serif text-2xl text-foreground/90">
              Turismo con alma, en tierra de historia.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCIAS */}
      <section id="experiencias" className="py-24 md:py-32 px-6 md:px-16 bg-mist/50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="eyebrow">Experiencias</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Una estadía que se convierte en recuerdo.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {experiences.map((x) => (
              <div key={x.title} className="bg-background p-10 hover:bg-card transition group">
                <div className="w-8 h-8 mb-6 rounded-full bg-clay/10 flex items-center justify-center text-clay group-hover:bg-clay group-hover:text-ivory transition">
                  <span className="w-2 h-2 rounded-full bg-current" />
                </div>
                <h3 className="font-serif text-2xl mb-3">{x.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-border">
        {[fogataImg, alpacasImg, cocinaImg, roomImg].map((src, i) => (
          <div key={i} className="aspect-[3/4] overflow-hidden bg-background">
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>
        ))}
      </section>

      {/* HABITACIONES + TARIFAS */}
      <section id="habitaciones" className="py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={roomImg}
              alt="Habitación con vista al valle andino"
              loading="lazy"
              width={1400}
              height={1000}
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-clay text-ivory p-6 max-w-[240px]">
              <p className="font-serif text-xl italic leading-snug">
                "Silencio, paisaje y comodidad… todo en armonía."
              </p>
            </div>
          </div>
          <div>
            <span className="eyebrow">Casitas y habitaciones</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Espacios diseñados para el descanso verdadero.</h2>
            <p className="mt-6 text-foreground/80 font-light leading-relaxed">
              Cada casita y habitación de Valley Q está pensada como un pequeño refugio: madera cálida,
              texturas tejidas a mano y grandes ventanas que enmarcan el valle. Precios en soles por noche.
            </p>

            <div className="mt-10 border-t border-border">
              <div className="grid grid-cols-12 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">
                <div className="col-span-6">Alojamiento</div>
                <div className="col-span-2 text-right">L–V</div>
                <div className="col-span-2 text-right">Sáb–Dom</div>
                <div className="col-span-2 text-right">Feriados</div>
              </div>
              {rates.map((r) => (
                <div key={r.name} className="grid grid-cols-12 py-5 border-b border-border/60 items-baseline">
                  <div className="col-span-6">
                    <div className="font-serif text-lg">{r.name}</div>
                    {r.note && <div className="text-xs text-muted-foreground mt-1">{r.note}</div>}
                  </div>
                  <div className="col-span-2 text-right tabular-nums">S/ {r.weekday}</div>
                  <div className="col-span-2 text-right tabular-nums">S/ {r.weekend}</div>
                  <div className="col-span-2 text-right tabular-nums text-clay font-medium">S/ {r.holiday}</div>
                </div>
              ))}
            </div>

            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-ink text-ivory px-8 py-4 rounded-sm hover:bg-clay transition"
            >
              Consultar disponibilidad →
            </a>
          </div>
        </div>
      </section>

      {/* QUINUA */}
      <section id="quinua" className="relative py-32 md:py-48 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={quinuaImg} alt="Pampa de Quinua al atardecer" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/40" />
        </div>
        <div className="relative z-10 max-w-3xl text-ivory">
          <span className="eyebrow text-ember">Quinua, tierra de historia</span>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl leading-tight">
            Donde el pasado vive en el presente.
          </h2>
          <p className="mt-8 text-lg text-ivory/85 font-light leading-relaxed max-w-2xl">
            Quinua es un Pueblo con Encanto, cuna de la Batalla de Ayacucho y hogar de artesanos que
            conservan técnicas ancestrales. Valley Q te invita a caminar entre árboles de queuña,
            conocer esta historia viva y reconectar con lo profundo del Perú.
          </p>
        </div>
      </section>

      {/* PROPÓSITO */}
      <section id="proposito" className="py-24 md:py-32 px-6 md:px-16 bg-mist/40">
        <div className="max-w-5xl mx-auto text-center">
          <span className="eyebrow">Turismo con propósito</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Viajar también es transformar.</h2>
          <p className="mt-8 text-lg text-foreground/80 font-light leading-relaxed max-w-3xl mx-auto">
            Valley Q forma parte de Altipacha y colabora con la ONG <span className="text-clay">Quinua Q</span> y el
            programa <span className="text-clay">Mamá Alis</span>, apoyando a comunidades vulnerables a través de
            formación y empleabilidad. Cada reserva impulsa una cadena de impacto positivo.
          </p>
          <div className="mt-12 grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { n: "01", t: "Formación", d: "Capacitación en hospitalidad y oficios locales." },
              { n: "02", t: "Empleabilidad", d: "Oportunidades reales para familias de Quinua." },
              { n: "03", t: "Preservación", d: "Cuidado del patrimonio andino y su gente." },
            ].map((it) => (
              <div key={it.n} className="text-left">
                <div className="font-serif text-3xl text-clay">{it.n}</div>
                <div className="mt-3 font-medium">{it.t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{it.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24 md:py-32 px-6 md:px-16 bg-ink text-ivory">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <span className="eyebrow text-ember">Reservas</span>
            <h2 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05]">
              Ven a habitar el <em className="italic">silencio</em>.
            </h2>
            <p className="mt-6 text-ivory/70 font-light max-w-md">
              Escríbenos por WhatsApp o llámanos para coordinar tu estadía, experiencias privadas y traslados desde Ayacucho.
            </p>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-ember text-ivory px-8 py-4 rounded-sm hover:bg-clay transition"
            >
              WhatsApp +51 921 500 056 →
            </a>
          </div>
          <div className="space-y-8 text-sm">
            <div>
              <div className="eyebrow text-ivory/50">Teléfonos</div>
              <div className="mt-3 space-y-1 text-ivory/90">
                <a href="tel:+51921500056" className="block hover:text-ember">+51 921 500 056</a>
                <a href="tel:+51066280891" className="block hover:text-ember">(066) 280 891</a>
              </div>
            </div>
            <div>
              <div className="eyebrow text-ivory/50">Email</div>
              <div className="mt-3 space-y-1 text-ivory/90">
                <a href="mailto:reservas@altipachahotel.com" className="block hover:text-ember">reservas@altipachahotel.com</a>
                <a href="mailto:ventas@altipachahotel.com" className="block hover:text-ember">ventas@altipachahotel.com</a>
              </div>
            </div>
            <div>
              <div className="eyebrow text-ivory/50">Central Altipacha</div>
              <div className="mt-3 text-ivory/90">
                Jirón 28 de Julio N° 527<br />
                Ayacucho — Huamanga, Perú
              </div>
            </div>
            <div>
              <div className="eyebrow text-ivory/50">Ubicación del lodge</div>
              <div className="mt-3 text-ivory/90">Quinua, Ayacucho — Perú</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-16 bg-ink text-ivory/60 border-t border-ivory/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} Valley Q Lodge · Altipacha Hotels · Parte de{" "}
            <a href="https://quinuaq.com" className="text-ember hover:underline">QuinuaQ</a>
          </div>
          <div>Refugio boutique en Quinua, Ayacucho — Perú</div>
        </div>
      </footer>
    </main>
  );
}
