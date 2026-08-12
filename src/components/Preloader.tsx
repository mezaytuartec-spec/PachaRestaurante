import { useEffect, useState } from "react";

/**
 * Telón de entrada: fondo del color de marca con la palabra PACHA que se abre
 * en tracking y después se desvanece para dejar ver el sitio.
 *
 * Con "reducir movimiento" activado el telón igual se muestra, pero en versión
 * sobria: sin desplazamiento ni apertura de tracking, solo un fundido corto que
 * maneja la animación `pacha-intro-sobrio`. Antes se salteaba por completo, y
 * como en iPhone la opción viene activada más seguido de lo que se cree, había
 * visitantes que no veían nada de la entrada.
 */
const ENTRADA = 1150; // el telón empieza a irse
const SALIDA = 600; // duración del fundido
const TOTAL = ENTRADA + SALIDA;

/** Mantener sincronizado con `.intro-sobrio` en styles.css. */
const TOTAL_SOBRIO = 1150;

export function Preloader() {
  const [estado, setEstado] = useState<"oculto" | "entrando" | "saliendo">("oculto");
  const [sobrio, setSobrio] = useState(false);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setSobrio(reducido);
    setEstado("entrando");
    window.scrollTo(0, 0);

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const terminar = () => {
      setEstado("oculto");
      document.body.style.overflow = previo;
    };

    const timers = reducido
      ? [window.setTimeout(terminar, TOTAL_SOBRIO)]
      : [
          window.setTimeout(() => setEstado("saliendo"), ENTRADA),
          window.setTimeout(terminar, TOTAL),
        ];

    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = previo;
    };
  }, []);

  if (estado === "oculto") return null;

  const telon = "fixed inset-0 z-[80] flex flex-col items-center justify-center bg-accent";
  const palabra = "serif text-[clamp(2.25rem,9vw,4.5rem)] leading-none text-foreground";
  const regla = "mt-8 block h-px w-[clamp(6rem,22vw,14rem)] bg-foreground/35";

  if (sobrio) {
    return (
      <div aria-hidden="true" className={`intro-sobrio ${telon}`}>
        <p className={palabra}>PACHA</p>
        <span className={regla} />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={telon}
      style={{
        opacity: estado === "saliendo" ? 0 : 1,
        transition: `opacity ${SALIDA}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      <p className={`intro-word ${palabra}`}>PACHA</p>
      <span className={`intro-rule ${regla}`} />
    </div>
  );
}
