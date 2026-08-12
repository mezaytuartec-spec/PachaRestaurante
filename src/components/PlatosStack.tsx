import plato1 from "@/assets/plato-1.jpg";
import plato2 from "@/assets/plato-2.jpg";
import plato3 from "@/assets/plato-3.jpg";
import plato4 from "@/assets/plato-4.jpg";

/**
 * Apilado por scroll: cada foto queda fija y la siguiente se le monta encima,
 * un poco más ancha que la anterior.
 *
 * Es CSS puro — `position: sticky` con un `top` distinto por foto — y no lleva
 * ninguna librería de smooth scroll a propósito: MagicText sigue el progreso de
 * scroll real de la página y un scroll hijackeado lo desincronizaría.
 *
 * Estas son las únicas fotos del sitio en color: no llevan la utility `grade`.
 * El blanco y negro sigue siendo el lenguaje de la página y la comida es lo
 * único que tiene color, así la decisión se lee como intencional.
 *
 * Los anchos van en `vh` para que el recorte quede parejo en cualquier pantalla:
 * con la figura a 80vh de alto, 60vh de ancho reproduce el 3:4 original casi sin
 * cortar y de ahí en adelante cada foto se abre un poco más. Las clases van
 * escritas completas porque Tailwind lee el código fuente tal cual.
 */
const FOTOS = [
  {
    src: plato1,
    w: 1125,
    h: 1500,
    top: "sm:top-0",
    ancho: "sm:w-[min(90vw,60vh)]",
    alt: "Sopa de tortellini en caldo de tomate con panceta crocante y cebolla de verdeo, en un bol de cerámica oscura sostenido con las dos manos",
  },
  {
    src: plato2,
    w: 1125,
    h: 1500,
    top: "sm:top-2",
    ancho: "sm:w-[min(90vw,66vh)]",
    alt: "Carpaccio de carne curada con crema, alcaparras y hojas verdes, servido en un plato de piedra clara sobre madera",
  },
  {
    src: plato3,
    w: 1125,
    h: 1500,
    top: "sm:top-4",
    ancho: "sm:w-[min(90vw,72vh)]",
    alt: "Corte de carne al punto con puré cremoso y un aceite de morrón y hierbas, en un plato de cerámica clara sobre una mesa de madera",
  },
  {
    src: plato4,
    w: 1385,
    h: 1488,
    top: "sm:top-6",
    ancho: "sm:w-[min(90vw,78vh)]",
    alt: "Lonjas de carne cubiertas de queso rallado en un plato hondo de barro, con un bol de salsa de morrón al fondo",
  },
];

export function PlatosStack() {
  return (
    <div className="w-full">
      {FOTOS.map((f) => (
        // El `top` escalonado deja ver el canto de la foto que quedó debajo.
        // En mobile no hay apilado: las fotos pasan una abajo de la otra.
        <div key={f.src} className={`w-full sm:sticky ${f.top}`}>
          <figure className="flex w-full items-center justify-center sm:h-[80vh]">
            <img
              src={f.src}
              alt={f.alt}
              width={f.w}
              height={f.h}
              loading="lazy"
              className={`w-full object-cover transition-all duration-300 sm:h-full ${f.ancho}`}
            />
          </figure>
        </div>
      ))}
    </div>
  );
}
