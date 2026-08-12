import logoPng from "@/assets/logo.png";

/**
 * Isotipo de Pacha.
 *
 * El PNG es trazo negro puro sobre transparencia, así que sobre el gris oscuro
 * del sitio quedaría invisible. En vez de invertirlo con un filtro se usa como
 * máscara y se pinta con `currentColor`: queda exactamente en el blanco hueso
 * de la marca y hereda el color del enlace que lo contiene.
 *
 * El dibujo trae aire propio dentro del cuadrado, así que el marco va un poco
 * más grande de lo que se ve para que el trazo empareje con el wordmark.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 bg-current ${className}`}
      style={{
        WebkitMaskImage: `url(${logoPng})`,
        maskImage: `url(${logoPng})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
