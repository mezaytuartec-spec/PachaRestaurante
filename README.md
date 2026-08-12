# Pacha Gallery

# Prompt para Lovable — Pacha Cocina de Autor

Estás construyendo la web de Pacha Cocina de Autor, un restaurante de cocina de autor fine dining en pleno centro de Cafayate, Salta, Argentina, en el corazón de la ruta del vino de los Valles Calchaquíes. Rango de precio real de 40.000 a 80.000 ARS por persona, reputación sólida (~4,5/5 en Google y Tripadvisor, +1000 reseñas), chef con identidad propia (Tomás Casado), ambiente relajado pero con estética muy cuidada, patio exterior, vajilla impecable.

La dirección estética debe ser sobria, moderna y prácticamente en blanco y negro: fondo predominantemente negro, fotografía editorial tratada en tonos apagados y casi monocromáticos, composiciones tipo galería de arte contemporáneo con mucho espacio negativo alrededor de cada elemento, tipografía fina y espaciada, navegación mínima. En desktop, el cursor debe ser un círculo pequeño que se agranda suavemente al pasar sobre elementos clicables (más detalle en la sección dedicada más abajo).

Importante: "sobrio y en blanco y negro" no significa frío ni corporativo. La sensación buscada es dramática, artística, casi de galería de arte contemporáneo, con fotografía de gran calidad tratada en tonos apagados. Es sofisticación por contención y contraste, no por color ni por efectos.

Es un sitio estático — **100% estático, sin SSR, sin Next.js con renderizado en servidor, sin Nitro, sin API routes.** Si se usa React, debe ser una SPA tipo Vite que compile con `npm run build` a una carpeta `dist/` con solo HTML/CSS/JS estáticos, deployable directo a cualquier hosting estático (Netlify, Vercel estático, GitHub Pages, Cloudflare Pages estático), sin servidor Node corriendo en producción ni funciones serverless. Debe funcionar perfecto en desktop y mobile — mucho del público reserva desde el celular en la ruta del vino, así que el cursor personalizado y cualquier efecto elaborado deben limitarse a desktop, con mobile priorizando velocidad y simplicidad.

<referencias_y_dirección_de_diseño>
Referencia: el fine dining editorial de altísimo nivel — fondo casi negro, fotografía tratada en tonos apagados/desaturados que se sienten casi en blanco y negro (aunque tengan un dejo de color cálido tenue), composiciones asimétricas y con mucho aire alrededor (como piezas mostradas en una galería, no como fotos de menú de delivery), tipografía delicada con mucho tracking en los detalles pequeños (navegación, etiquetas) y un logotipo/titular con una serif fina y elegante.

Mantener la identidad regional (Cafayate, Valles Calchaquíes) expresada a través de la fotografía tratada en este tono sobrio, no a través de color cálido: fotos de platos, viñedos al atardecer, la cocina, texturas de adobe o piedra — todo pasado por el mismo tratamiento apagado/monocromático que unifica la paleta.

Evitar activamente:
- Cualquier acento de color que rompa la sobriedad — nada de vino tinto saturado, terracota ni mostaza como color estructural. Si se usa algún acento de color, debe ser extremadamente sutil y usado 1-2 veces como mucho en toda la página.
- Inventar distinciones, premios o afiliaciones (ej. algún sello o membresía gastronómica) que Pacha no tenga confirmados — no incluir ningún badge de este tipo salvo que se indique explícitamente que existe.
- El look "restaurante genérico de IA": tarjetas idénticas, iconitos de tenedor/cuchillo, botones "pill", testimonios en carrusel con estrellas amarillas.
- Copiar descripciones de menú de otros sitios — todo el copy debe ser original.
</referencias_y_dirección_de_diseño>

<sistema_de_diseño>

**Paleta** — monocromática, casi en blanco y negro, con la fotografía como única fuente real de matiz:
- Fondo base: `#0A0A0A` (negro profundo, no negro puro plano)
- Texto principal: `#EDE9E3` (blanco hueso/crema, nunca blanco puro)
- Texto secundario/etiquetas: `rgba(237,233,227,0.6)`
- Líneas y divisores: `rgba(237,233,227,0.15)`
- Acento (uso extremadamente restringido, opcional): un tono vino muy apagado y oscuro (`#3D1420`) solo para un detalle puntual (ej. el glifo decorativo o un micro-detalle en el botón de reserva al hover) — nunca como color estructural ni de fondo de sección.
- Fotografía: tratamiento de color desaturado/apagado (no blanco y negro puro necesariamente, pero sí con la saturación reducida y contraste elevado, como en la referencia) para que todo el sitio se sienta unificado en esta paleta contenida.

**Tipografía**:
- Titulares/logotipo: serif fina y elegante con trazos delicados (tipo "Canela Light", "Georgia" muy fina, o una display serif con astas delgadas) — para el nombre "Pacha" en el header y los títulos de sección grandes.
- Navegación y etiquetas pequeñas: sans-serif fina, en mayúsculas, con tracking amplio (letter-spacing generoso).
- Cuerpo de texto: sans-serif limpia, peso liviano (300-400), buena altura de línea para los bloques de storytelling y descripciones de platos.
- Jerarquía por tamaño y espaciado, no por peso — evitar bold pesado; todo el sitio debe sentirse liviano y aireado.

**Fotografía — el elemento central de todo el sitio**:
- Composiciones asimétricas, con mucho espacio negativo alrededor del sujeto (ej. un plato pequeño centrado en un fondo oscuro amplio, no ocupando todo el frame).
- Full-bleed en el hero y en transiciones de sección, pero también permitir fotos "flotantes" con márgenes generosos, como en una galería.
- Tratamiento de color: desaturado, contraste alto, sombras profundas — aplicar un filtro/grading consistente a todas las fotos para que se sientan parte del mismo sistema visual.
- Si no hay fotos reales disponibles, usar placeholders explícitos como [FOTO: plato de autor en composición minimalista sobre fondo oscuro, tratamiento desaturado] en vez de imágenes de stock genéricas.

**Formas**:
- Esquinas rectas, sin excepción — nada de bordes redondeados en ningún elemento. Esto refuerza la sobriedad.
- Un glifo/ícono decorativo simple y propio (ej. un motivo lineal abstracto que evoque una vid, una montaña o una copa, en trazo muy fino), diseñado especialmente para Pacha, para usar como separador entre secciones.
- Sin sombras difusas, sin gradientes decorativos.

</sistema_de_diseño>

<diseño_de_cursor>
Solo para desktop (`@media (hover: hover) and (pointer: fine)` — desactivado completamente en mobile/touch, donde debe comportarse de forma nativa):
- Cursor por defecto: círculo pequeño (8-10px de diámetro), borde de 1px en el color texto (`#EDE9E3`), sin relleno o con relleno translúcido muy sutil.
- Al pasar sobre elementos interactivos (botones, links de navegación, fotografías clicables): el círculo se agranda suavemente hasta unos 40-48px, ya sea con un relleno translúcido sutil (`rgba(237,233,227,0.08)`) o simplemente engrosando el borde — mantenerlo minimalista, sin efectos de brillo ni color.
- Movimiento: seguimiento suave con interpolación (lerp, factor de suavizado ~0.15), nunca instantáneo ni brusco — debe sentirse con peso, no como un cursor nativo reemplazado sin criterio.
- Sin estela, sin partículas, sin color — la sobriedad del resto del sitio aplica también acá.
- Ocultar el cursor nativo del sistema mientras este cursor personalizado esté activo (solo en desktop).
</diseño_de_cursor>

<estructura_de_secciones>

**1. Header**
- Logo "Pacha" centrado o a la izquierda en la serif fina, navegación minimalista (Menú, El Lugar, Nuestro Chef, Reservas), fondo transparente sobre el hero.
- Botón "Reservar mesa" discreto pero visible — borde fino, texto en mayúsculas con tracking, sin relleno sólido llamativo (puede rellenarse sutilmente solo al hover).
- Mobile: menú hamburguesa simple a pantalla completa, manteniendo la paleta oscura.

**2. Hero**
- Fotografía full-bleed en tratamiento apagado/desaturado: un plato de autor en composición minimalista, o el patio al atardecer en tonos casi monocromáticos.
- Título editorial en la serif fina: "Cocina de autor en el corazón de los Valles Calchaquíes" (o variación breve).
- CTAs mínimos: "Ver menú" y "Reservar mesa", como texto/outline, sin botones sólidos llamativos.
- Mobile: imagen ocupa buena parte del viewport, texto sobre un área con contraste suficiente (overlay oscuro sutil detrás del texto si hace falta).

**3. Introducción / Concepto**
- Bloque de texto centrado, ancho de lectura cómodo (60-70ch), tipografía liviana, mucho espacio en blanco (negro) alrededor.
- El glifo decorativo propio de Pacha como separador antes o después de este bloque.

**4. Menú**
- Formato lista editorial, con mucho espacio entre platos — nombre en la serif fina, descripción breve en sans-serif liviana debajo.
- Fotografías intercaladas cada 2-3 ítems, con el mismo tratamiento apagado, en composiciones con espacio negativo (no ocupando todo el ancho).
- Categorías: Entradas, Principales, Vegetarianos, Postres, Vinos & Bebidas.
- Platos (descripciones originales, no copiadas): volcán de chocolate con corazón fundente; cheesecake de mandarina con cítricos de la región; risotto cremoso con vegetales de estación; ravioles caseros rellenos de ricotta y hierbas de la zona con salsa de tomates asados; ojo de bife grillado con acompañamientos locales; vinos con foco en Malbec y Torrontés de los Valles Calchaquíes.

**5. El Lugar**
- Fotografías grandes del interior, patio y cocina abierta, en composiciones asimétricas con espacio negativo, mismo tratamiento de color apagado.
- Texto breve, liviano, sin exceso de adjetivos.

**6. Nuestro Chef**
- Foto de Tomás Casado en la cocina, tratada con el mismo grading oscuro/dramático que el resto del sitio, capturándolo en plena acción.
- Texto breve sobre su enfoque: producto local, técnica contemporánea, respeto por la tradición salteña.

**7. Reseñas**
- 3-4 testimonios parafraseados, presentados como citas editoriales grandes sobre fondo negro, con mucho espacio alrededor — nombre y contexto breve debajo en la tipografía pequeña con tracking.
- Dato destacado: "4,5/5 en Google y Tripadvisor · más de 1.000 opiniones".

**8. Reservas y Contacto**
- Dirección: Av. Gral. Güemes Sur 143, Cafayate, Salta.
- Horarios: Martes a sábado 19:00–23:30. Domingo y lunes cerrado. Turnos: 19:00, 20:00, 21:30.
- Teléfono: +54 3868 41-2206.
- Botón "Reservar mesa" enlazando a pacha.meitre.com — mismo estilo discreto (outline) del resto del sitio.
- Mapa embebido de Google Maps (considerar un estilo de mapa oscuro/personalizado si Lovable lo permite, para mantener coherencia visual).
- Precio de forma discreta en texto pequeño: "Precio por persona: 40.000–80.000 ARS".

**9. Footer**
- Nombre, dirección corta, redes sociales, enlaces legales, copyright — todo en la tipografía pequeña con tracking, sobre el fondo negro.

</estructura_de_secciones>

<animaciones_y_comportamiento>
Principio: la sobriedad se transmite con quietud, no con movimiento — todo debe sentirse muy contenido.

- **Scroll reveals**: fade muy sutil (sin translateY pronunciado), lento y suave — casi imperceptible, como una galería que revela sus piezas de a una.
- **Cursor personalizado**: ver sección dedicada arriba. Solo desktop.
- **Hover en fotografías**: ligerísimo cambio de opacidad o escala mínima (1.01-1.02) — nada llamativo.
- **Transiciones entre secciones**: crossfade simple, sin scroll-jacking ni parallax.
- **Nada de WebGL, partículas, ni efectos decorativos** — la sofisticación acá es la ausencia de ruido, no la presencia de efectos.
- Imágenes: lazy loading nativo, `aspect-ratio` fijo, compresión adecuada para carga rápida pese a las fotos grandes.
- Respetar `prefers-reduced-motion: reduce` (esto además desactiva el cursor personalizado).
- Objetivo: 60fps, cero layout shift, carga rápida.
</animaciones_y_comportamiento>

<requisitos_técnicos>
- Sitio 100% estático (SPA sin SSR, ver aclaración arriba), funcional en mobile y desktop (breakpoints: <640px, 640-1024px, >1024px).
- Cursor personalizado únicamente en desktop con puntero fino (`@media (hover: hover) and (pointer: fine)`); en mobile/touch usar el comportamiento nativo sin ningún intento de simularlo.
- Tipografía fluida con `clamp()` para titulares grandes.
- Botones y elementos táctiles con área mínima de 44x44px en mobile.
- Contraste AA mínimo entre el texto crema y el fondo negro (ya debería cumplirse ampliamente con esta paleta, pero verificar igual sobre las fotografías).
- SEO básico: meta tags, título por sección, alt text descriptivo.
- El botón/link de reserva debe apuntar a https://pacha.meitre.com/ y estar presente en más de un punto de la página.
</requisitos_técnicos>

<checklist_final>
□ ¿El sitio se siente sobrio y en blanco y negro, sin depender de color para transmitir sofisticación?
□ ¿La fotografía tiene el mismo tratamiento apagado/desaturado en todas las secciones, unificando la paleta?
□ ¿El cursor personalizado funciona solo en desktop, con movimiento suave (lerp) y sin efectos de color/brillo?
□ ¿El glifo decorativo y todos los elementos visuales son originales, propios de la identidad de Pacha?
□ ¿No se inventó ninguna distinción o premio que Pacha no tenga confirmado?
□ ¿Las esquinas son rectas en todo el sitio, sin bordes redondeados?
□ ¿El menú y las descripciones de platos siguen siendo originales, no copiados?
□ ¿Todas las animaciones priorizan mobile (con el cursor personalizado desactivado ahí) y respetan `prefers-reduced-motion`?
</checklist_final>

Construye esta web con el mismo rigor editorial que un restaurante de alta cocina reconocido internacionalmente, llevando la identidad de Pacha (Cafayate, Valles Calchaquíes, cocina de autor) a un lenguaje visual sobrio, oscuro y contenido — sofisticación por contraste y silencio visual, no por color ni por efectos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1288fe38-8437-4a57-8b8d-8b679e2997dd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
