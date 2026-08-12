/**
 * Glifo propio de Pacha: montaña + vid en un solo trazo fino.
 *
 * Los trazos se dibujan solos cuando el glifo entra en pantalla: `pathLength=1`
 * normaliza los largos para que todos avancen al mismo ritmo, y el dibujo lo
 * dispara la clase `.reveal-in` del `Reveal` que lo envuelve (ver styles.css).
 */
export function Glyph({ className = "", size = 44 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        className="glyph-trazo"
        pathLength={1}
        d="M4 34 L16 16 L24 27 L32 12 L44 34"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        className="glyph-trazo"
        pathLength={1}
        style={{ transitionDelay: "160ms" }}
        d="M24 27 L24 44"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        className="glyph-trazo"
        pathLength={1}
        style={{ transitionDelay: "300ms" }}
        d="M24 36 C18 36 16 32 16 29"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        className="glyph-trazo"
        pathLength={1}
        style={{ transitionDelay: "380ms" }}
        d="M24 40 C30 40 32 36 32 33"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle
        className="glyph-punto"
        cx="24"
        cy="8"
        r="2.25"
        stroke="#3D1420"
        strokeWidth="1"
        fill="#3D1420"
      />
    </svg>
  );
}
