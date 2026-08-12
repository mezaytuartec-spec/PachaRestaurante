import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Cursor } from "@/components/Cursor";
import { Glyph } from "@/components/Glyph";
import { Logo } from "@/components/Logo";
import { MagicText } from "@/components/MagicText";
import { PlatosStack } from "@/components/PlatosStack";
import { Preloader } from "@/components/Preloader";
import { Reveal } from "@/components/Reveal";

import heroImg from "@/assets/hero.jpg";
import chefImg from "@/assets/chef.jpg";
import patioImg from "@/assets/patio.jpg";
import vineyardImg from "@/assets/vineyard.jpg";
import dishImg from "@/assets/dish-1.jpg";
import wineImg from "@/assets/wine.jpg";

/*
 * El título visible del hero ya no menciona la ubicación, pero el SEO sí la
 * mantiene: "Cafayate" y "Salta" son de donde llega la búsqueda local.
 */
const TITLE = "Pacha · Cocina de Autor en Cafayate, Salta";
const DESCRIPTION =
  "Menú de recolección del chef Tomás Casado en Cafayate, Salta: producto del valle, cocina abierta y patio en el centro del pueblo. Reservas online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const RESERVA = "https://pacha.meitre.com/";
const CONTACTO = "pachacocinadeautor@gmail.com";
const CARTA_PDF = "/carta-pacha.pdf";

const NAV = [
  { label: "Platos", href: "#menu" },
  { label: "El Lugar", href: "#lugar" },
  { label: "Nuestro Chef", href: "#chef" },
  { label: "Eventos", href: "#eventos" },
  { label: "Reservas", href: "#reservas" },
];

/** `desc` es opcional: algunos platos de la carta van solo con su nombre. */
type Plato = { nombre: string; desc?: string };
type Categoria = { titulo: string; platos: Plato[] };

const MENU: Categoria[] = [
  {
    titulo: "Entradas",
    platos: [
      {
        nombre: "Gyozas de pollo",
        desc: "Jengibre, ajo y salsa agridulce picante.",
      },
      {
        nombre: "Trucha",
        desc: "Salsa de maní, picante y fideos de arroz.",
      },
    ],
  },
  {
    titulo: "Principales",
    platos: [
      {
        nombre: "Ojo de bife añejado, 300 g",
        desc: "Hierbas andinas, crema de zanahoria, berenjena ahumada y tahini.",
      },
      {
        nombre: "Lasaña de pollo",
        desc: "Masa negra, stracciatella, tajín, limón y papas pay.",
      },
    ],
  },
  {
    titulo: "Vegetarianos",
    platos: [
      {
        nombre: "Cremoso de quinoa",
        desc: "Maíz frito, pochoclo y vegetales.",
      },
      {
        nombre: "Ñoquis de ricota",
        desc: "Crema de torrontés, aceite verde y zapallo.",
      },
    ],
  },
  {
    titulo: "Postres",
    platos: [
      {
        nombre: "Volcán de chocolate",
        desc: "Servido con helado.",
      },
      {
        nombre: "Flan cremoso de dulce de leche",
      },
    ],
  },
  {
    titulo: "Vinos & Bebidas",
    platos: [
      {
        nombre: "Torrontés Reserva, Los Morros",
        desc: "De productores del Valle Calchaquí. Por copa o botella.",
      },
      {
        nombre: "Amauta Malbec, Bodega El Porvenir",
        desc: "De viñedos vecinos. Por copa o botella.",
      },
    ],
  },
];

const EVENTOS = [
  {
    titulo: "Catering",
    // "Cocina de autor étnica de recolección" salió de acá: ahora es el título
    // principal del sitio y no tiene que aparecer dos veces.
    desc: "Vamos a cocinar afuera: a tu casa, a una bodega o al medio de una quebrada. Cuidamos la materia prima local y usamos técnicas de distintos lados para resaltar el sabor y la textura, con asado en jaula y una presentación cuidada.",
    asunto: "Consulta por catering",
  },
  {
    titulo: "Fiestas privadas",
    desc: "Son parte del restaurante, no un servicio aparte: la sala y el patio para tu grupo, con la carta y el asado en jaula de siempre. Se pueden coordinar días y turnos en los que normalmente no abrimos, escribiéndonos por mail.",
    asunto: "Consulta por fiesta privada",
  },
];

const RESENAS = [
  {
    cita: "Tomás se acercó a la mesa a sugerirnos los platos. Con mi esposa compartimos gyozas, tiradito de trucha, ojo de bife madurado y un tiramisú para terminar.",
    autor: "Mau Camen",
    ctx: "Cena en el patio",
  },
  {
    cita: "Elegimos Pacha para nuestra cena de aniversario y fue exactamente lo que buscábamos.",
    autor: "Lisset Saenz",
    ctx: "Aniversario",
  },
  {
    cita: "Cada plato tiene identidad y propósito. Pacha no solo alimenta: emociona.",
    autor: "Enmanuel Lara",
    ctx: "Reseña en Google",
  },
  {
    cita: "Dos semanas recorriendo el norte argentino y esta fue, sin dudas, la mejor comida del viaje.",
    autor: "Fernando Castelani",
    ctx: "De viaje por el norte",
  },
];

/** Va envuelto en Reveal porque el glifo dibuja sus trazos al entrar en pantalla. */
function Divider() {
  return (
    <Reveal className="flex justify-center py-20 text-foreground/70 sm:py-28">
      <Glyph />
    </Reveal>
  );
}

function ReservarLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={RESERVA}
      target="_blank"
      rel="noopener noreferrer"
      className={`label inline-flex min-h-[44px] items-center justify-center border border-line px-6 transition-colors duration-500 hover:border-foreground/50 hover:bg-[#3D1420]/40 ${className}`}
    >
      Reservar mesa
    </a>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Parallax del hero: la foto se va más despacio que el texto y el bloque de
   * título sube y se apaga al scrollear. Es el primer movimiento que se ve al
   * entrar. Con movimiento reducido los rangos quedan en cero y no pasa nada.
   */
  const hero = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress: heroProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  // La foto mide 118% del alto del hero, así que puede subir sin dejar hueco.
  const fotoY = useTransform(heroProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-15%"]);
  const fotoScale = useTransform(heroProgress, [0, 1], [1, reduceMotion ? 1 : 1.06]);
  const textoY = useTransform(heroProgress, [0, 1], ["0px", reduceMotion ? "0px" : "-90px"]);
  const textoOpacity = useTransform(heroProgress, [0, 0.75], [1, reduceMotion ? 1 : 0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Preloader />
      <Cursor />

      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${scrolled ? "border-b border-line bg-background/90 backdrop-blur-sm" : ""}`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-all duration-700 sm:px-10 ${scrolled ? "py-4" : "py-6"}`}
        >
          {/* El nombre gana presencia: isotipo al lado del wordmark, y los dos se
              recogen un poco cuando la página arranca a scrollear. */}
          <a href="#top" className="flex items-center gap-3 sm:gap-4">
            <Logo
              className={`transition-all duration-700 ${scrolled ? "h-9 w-9 sm:h-10 sm:w-10" : "h-10 w-10 sm:h-12 sm:w-12"}`}
            />
            <span
              className={`serif tracking-[0.18em] transition-all duration-700 ${scrolled ? "text-2xl sm:text-[1.8rem]" : "text-[1.75rem] sm:text-[2.15rem]"}`}
            >
              PACHA
            </span>
          </a>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Principal">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="label text-muted-foreground transition-colors duration-500 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <ReservarLink />
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú de navegación"
            className="label flex h-11 w-11 items-center justify-end lg:hidden"
          >
            <span className="block h-px w-7 bg-foreground shadow-[0_6px_0_0_currentColor]" />
          </button>
        </div>
      </header>

      {/* Menú mobile */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-background lg:hidden">
          <div className="flex items-center justify-between px-6 py-6">
            <span className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <span className="serif text-[1.75rem] tracking-[0.18em]">PACHA</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="label h-11 w-11 text-right"
            >
              Cerrar
            </button>
          </div>
          <nav className="flex flex-col gap-8 px-6 pt-16" aria-label="Móvil">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="serif min-h-[44px] text-4xl"
              >
                {n.label}
              </a>
            ))}
            <ReservarLink className="mt-8 self-start" />
          </nav>
        </div>
      )}

      <main id="top">
        {/* Hero */}
        <section ref={hero} className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
          {/* El filtro va en el contenedor y el movimiento en la foto: si `grade`
              cayera sobre la imagen animada, su transition de transform pelearía
              con el parallax cuadro a cuadro. El 125% de alto es el margen que
              necesita la foto para subir un 15% sin dejar hueco abajo. */}
          <div className="grade absolute inset-0 overflow-hidden">
            <motion.img
              src={heroImg}
              alt="Plato de autor de Pacha servido sobre una mesa oscura, iluminado por una única luz"
              width={1600}
              height={1104}
              className="absolute inset-x-0 top-0 h-[125%] w-full object-cover"
              style={{ y: fotoY, scale: fotoScale }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
          <motion.div
            className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-28"
            style={{ y: textoY, opacity: textoOpacity }}
          >
            <Reveal>
              <p className="label text-muted-foreground">Cafayate · Valles Calchaquíes</p>
              <h1 className="serif mt-8 max-w-[20ch] text-[clamp(2.5rem,7vw,6rem)] leading-[1.05]">
                Cocina de autor étnica de recolección
              </h1>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <a
                  href="#menu"
                  className="label inline-flex min-h-[44px] items-center border-b border-line pb-2 transition-colors duration-500 hover:border-foreground"
                >
                  Ver menú
                </a>
                <ReservarLink />
              </div>
            </Reveal>
          </motion.div>
        </section>

        {/* Concepto */}
        <section className="mx-auto max-w-[1600px] px-6 pt-28 sm:px-10 sm:pt-40">
          <Reveal className="mx-auto max-w-[62ch] text-center">
            <p className="label text-muted-foreground">El concepto</p>
            <p className="serif mt-10 text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.55]">
              Pacha trabaja con lo que el valle da en cada momento del año: maíz, cabra,
              hierbas de altura, frutas cítricas, vides que crecen a más de mil setecientos
              metros.
            </p>
            <p className="mt-8 text-base leading-[1.9] text-muted-foreground">
              El menú cambia con la temporada y se cocina en una sola cocina abierta, a la
              vista. La sala es tranquila, el patio se abre cuando la noche acompaña, y el
              servicio acompaña sin interrumpir. Nada acá busca llamar la atención: la
              intención es que el producto del norte se explique solo.
            </p>
          </Reveal>
          <Divider />
        </section>

        {/* Los platos, en color. El apilado no va envuelto en Reveal: un
            transform en el ancestro rompería el position: sticky. */}
        <section aria-label="Fotos de platos">
          <Reveal className="mx-auto max-w-[1600px] px-6 sm:px-10">
            <p className="label text-muted-foreground">La comida</p>
          </Reveal>
          <div className="mt-14 sm:mt-20">
            <PlatosStack />
          </div>
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
            <Divider />
          </div>
        </section>

        {/* Menú */}
        <section id="menu" className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <Reveal>
            <p className="label text-muted-foreground">01 — Carta</p>
            <h2 className="serif mt-6 text-[clamp(2.2rem,5vw,4rem)]">Platos principales</h2>
          </Reveal>

          <div className="mt-20 grid gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] lg:gap-32">
            <div className="flex flex-col gap-24">
              {/* Los platos entran escalonados detrás del título de la categoría. */}
              {MENU.map((cat) => (
                <section key={cat.titulo}>
                  <Reveal>
                    <h3 className="label border-b border-line pb-6 text-muted-foreground">
                      {cat.titulo}
                    </h3>
                  </Reveal>
                  <ul className="mt-12 flex flex-col gap-14">
                    {cat.platos.map((p, i) => (
                      <Reveal as="li" key={p.nombre} delay={140 + i * 160} className="max-w-[52ch]">
                        <p className="serif text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight">
                          {p.nombre}
                        </p>
                        {p.desc && (
                          <p className="mt-4 text-sm leading-[1.9] text-muted-foreground">
                            {p.desc}
                          </p>
                        )}
                      </Reveal>
                    ))}
                  </ul>
                </section>
              ))}

              <Reveal>
                <a
                  href={CARTA_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex min-h-[44px] items-center border-b border-line pb-2 text-muted-foreground transition-colors duration-500 hover:border-foreground hover:text-foreground"
                >
                  Ver carta completa (PDF)
                </a>
              </Reveal>

              <Reveal className="max-w-[52ch] border-t border-line pt-10">
                <p className="label text-muted-foreground">Bueno saber</p>
                <p className="mt-6 text-sm leading-[1.9] text-muted-foreground">
                  Opciones para celíacos y vegetarianos siempre disponibles: el chef es celíaco, así
                  que la cocina trabaja con ese cuidado a diario.
                </p>
                <p className="mt-4 text-sm leading-[1.9] text-muted-foreground">
                  El menú degustación se arma a diario y, reservando con 48 horas de anticipación,
                  se adapta a cualquier restricción alimentaria.
                </p>
                <p className="mt-4 text-sm leading-[1.9] text-muted-foreground">
                  No atendemos más de 6 personas por mesa. Para grupos mayores, escribinos a{" "}
                  <a
                    href={`mailto:${CONTACTO}`}
                    className="border-b border-line transition-colors duration-500 hover:border-foreground hover:text-foreground"
                  >
                    {CONTACTO}
                  </a>
                  .
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-32 lg:pt-40">
              <Reveal as="figure" className="lg:pr-12">
                <img
                  src={dishImg}
                  alt="Volcán de chocolate con corazón fundente sobre plato de cerámica clara"
                  width={1104}
                  height={1312}
                  loading="lazy"
                  className="grade w-full object-cover hover:opacity-90"
                  style={{ aspectRatio: "4 / 5" }}
                />
                <figcaption className="label mt-6 text-muted-foreground">
                  Volcán de chocolate
                </figcaption>
              </Reveal>

              <Reveal as="figure" delay={160} className="lg:pl-16">
                <img
                  src={wineImg}
                  alt="Dos copas de vino y una botella oscura sobre una mesa de piedra"
                  width={1200}
                  height={912}
                  loading="lazy"
                  className="grade w-full object-cover hover:opacity-90"
                  style={{ aspectRatio: "4 / 3" }}
                />
                <figcaption className="label mt-6 text-muted-foreground">
                  Malbec y Torrontés del valle
                </figcaption>
              </Reveal>
            </div>
          </div>

          <Divider />
        </section>

        {/* El Lugar */}
        <section id="lugar" className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <Reveal>
            <p className="label text-muted-foreground">02 — El lugar</p>
            <h2 className="serif mt-6 max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] leading-[1.1]">
              Una casa de adobe en el centro de Cafayate
            </h2>
          </Reveal>

          <Reveal as="figure" className="mt-20">
            <img
              src={patioImg}
              alt="Patio exterior de Pacha al anochecer, con mesas de madera y muros de adobe"
              width={1600}
              height={1008}
              loading="lazy"
              className="grade w-full object-cover"
              style={{ aspectRatio: "16 / 10" }}
            />
          </Reveal>

          <div className="mt-24 grid gap-16 lg:grid-cols-2 lg:items-end">
            <Reveal as="figure" className="lg:max-w-[80%]">
              <img
                src={vineyardImg}
                alt="Hileras de viñedos al atardecer con los cerros de los Valles Calchaquíes al fondo"
                width={1600}
                height={912}
                loading="lazy"
                className="grade w-full object-cover"
                style={{ aspectRatio: "16 / 9" }}
              />
            </Reveal>
            <Reveal className="max-w-[54ch] lg:pb-6">
              <p className="text-base leading-[1.9] text-muted-foreground">
                Muros gruesos, luz baja, mesas separadas. Adentro, la cocina abierta marca
                el ritmo de la noche; afuera, el patio queda protegido del viento del valle.
                A unas cuadras, los viñedos empiezan donde termina el pueblo.
              </p>
            </Reveal>
          </div>

          <Divider />
        </section>

        {/* Chef */}
        <section id="chef" className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <div className="grid gap-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-28">
            <Reveal as="figure">
              <img
                src={chefImg}
                alt="El chef Tomás Casado emplatando con pinzas en la cocina de Pacha"
                width={1200}
                height={1504}
                loading="lazy"
                className="grade w-full object-cover"
                style={{ aspectRatio: "4 / 5" }}
              />
            </Reveal>
            <Reveal className="flex flex-col justify-center">
              <p className="label text-muted-foreground">03 — Nuestro chef</p>
              <h2 className="serif mt-6 text-[clamp(2.2rem,5vw,4rem)]">Tomás Casado</h2>
              <p className="mt-10 max-w-[56ch] text-base leading-[1.9] text-muted-foreground">
                Trabaja con productores del valle y decide el menú según lo que llega esa
                semana. Técnica contemporánea aplicada con criterio, sin tapar el producto,
                y respeto por la cocina salteña de la que aprendió: cocciones largas, fuego,
                maíz, paciencia.
              </p>
              <p className="mt-6 max-w-[56ch] text-base leading-[1.9] text-muted-foreground">
                Su idea de cocina de autor no está en la sofisticación del plato sino en la
                decisión de servir solo lo que el valle puede sostener.
              </p>
            </Reveal>
          </div>

          <Divider />
        </section>

        {/* Reseñas */}
        <section className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <Reveal>
            <p className="label text-muted-foreground">04 — Reseñas</p>
          </Reveal>
          <div className="mt-20 flex flex-col gap-28">
            {RESENAS.map((r, i) => (
              <Reveal
                key={r.autor}
                as="figure"
                className={i % 2 === 0 ? "lg:max-w-[62%]" : "lg:ml-auto lg:max-w-[62%] lg:text-right"}
              >
                <MagicText
                  as="blockquote"
                  text={r.cita}
                  className="serif text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.4]"
                />
                <figcaption className="label mt-8 text-muted-foreground">
                  {r.autor} — {r.ctx}
                </figcaption>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-28 border-t border-line pt-10">
            <p className="label text-muted-foreground">
              4,5★ · 1.100+ en Google, 550+ en TripAdvisor
            </p>
          </Reveal>
          <Divider />
        </section>

        {/* Eventos */}
        <section id="eventos" className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <Reveal>
            <p className="label text-muted-foreground">05 — Eventos</p>
            <h2 className="serif mt-6 max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] leading-[1.1]">
              Fuera de la carta
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
            {EVENTOS.map((e, i) => (
              <Reveal as="section" key={e.titulo} delay={i * 180} className="flex flex-col">
                <h3 className="serif border-t border-line pt-8 text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight">
                  {e.titulo}
                </h3>
                <p className="mt-6 max-w-[46ch] flex-1 text-sm leading-[1.9] text-muted-foreground">
                  {e.desc}
                </p>
                <a
                  href={`mailto:${CONTACTO}?subject=${encodeURIComponent(e.asunto)}`}
                  className="label mt-8 inline-flex min-h-[44px] items-center self-start border-b border-line pb-2 text-muted-foreground transition-colors duration-500 hover:border-foreground hover:text-foreground"
                >
                  Consultar
                </a>
              </Reveal>
            ))}
          </div>

          <Divider />
        </section>

        {/* Reservas */}
        <section id="reservas" className="mx-auto max-w-[1600px] px-6 sm:px-10">
          <Reveal>
            <p className="label text-muted-foreground">06 — Reservas</p>
            <h2 className="serif mt-6 text-[clamp(2.2rem,5vw,4rem)]">Visitanos</h2>
          </Reveal>

          <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal className="flex flex-col gap-12">
              <div>
                <p className="label text-muted-foreground">Dirección</p>
                <p className="mt-4 text-base leading-[1.9]">
                  Av. Gral. Güemes Sur 143
                  <br />
                  Cafayate, Salta, Argentina
                </p>
              </div>
              <div>
                <p className="label text-muted-foreground">Horarios</p>
                <p className="mt-4 text-base leading-[1.9]">
                  Martes a sábado, 19:00 – 23:30
                  <br />
                  Domingo y lunes, cerrado
                </p>
                <p className="mt-2 text-sm leading-[1.9] text-muted-foreground">
                  Turnos: 19:00 · 20:00 · 21:00 · 22:00
                </p>
              </div>
              <div>
                <p className="label text-muted-foreground">Teléfono</p>
                <a
                  href="tel:+543868412206"
                  className="mt-4 inline-flex min-h-[44px] items-center text-base"
                >
                  +54 3868 41-2206
                </a>
              </div>
              <div>
                <ReservarLink />
                <p className="mt-6 max-w-[46ch] text-sm leading-[1.9] text-muted-foreground">
                  Para grupos especiales, o para días y turnos en los que no abrimos, comunicate con
                  el restaurante por teléfono o escribinos a{" "}
                  <a
                    href={`mailto:${CONTACTO}`}
                    className="border-b border-line transition-colors duration-500 hover:border-foreground hover:text-foreground"
                  >
                    {CONTACTO}
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal>
              <iframe
                title="Ubicación de Pacha Cocina de Autor en Cafayate, Salta"
                src="https://www.google.com/maps?q=Av.%20Gral.%20G%C3%BCemes%20Sur%20143,%20Cafayate,%20Salta&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full border border-line"
                style={{ aspectRatio: "4 / 3", filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
              />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-40 max-w-[1600px] border-t border-line px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Logo className="h-14 w-14" />
              <p className="serif text-[2rem] tracking-[0.18em]">PACHA</p>
            </div>
            <p className="label mt-6 text-muted-foreground">
              Av. Gral. Güemes Sur 143 · Cafayate, Salta
            </p>
          </div>
          <nav aria-label="Enlaces del pie" className="flex flex-wrap gap-8">
            <a
              href="https://www.instagram.com/pachacafayate"
              target="_blank"
              rel="noopener noreferrer"
              className="label min-h-[44px] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/pachacafayate/"
              target="_blank"
              rel="noopener noreferrer"
              className="label min-h-[44px] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            >
              Facebook
            </a>
            <a
              href={`mailto:${CONTACTO}`}
              className="label min-h-[44px] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            >
              {CONTACTO}
            </a>
            <a
              href={RESERVA}
              target="_blank"
              rel="noopener noreferrer"
              className="label min-h-[44px] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            >
              Reservas
            </a>
            <a
              href="#menu"
              className="label min-h-[44px] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            >
              Platos
            </a>
          </nav>
        </div>
        <p className="label mt-16 text-muted-foreground">
          © {new Date().getFullYear()} Pacha Cocina de Autor · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
