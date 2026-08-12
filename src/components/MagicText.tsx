import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ElementType } from "react";

/**
 * Texto que se ilumina palabra por palabra a medida que scrolleás: una copia
 * tenue de fondo siempre visible y una copia superpuesta cuya opacidad sigue
 * el progreso de scroll del bloque. Respeta prefers-reduced-motion.
 */

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-[0.3em] inline-block">
      <span className="opacity-30">{children}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {children}
      </motion.span>
    </span>
  );
}

export function MagicText({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: ElementType;
}) {
  const container = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ").filter(Boolean);
  const Comp = Tag;

  if (reduceMotion) {
    return <Comp className={className}>{text}</Comp>;
  }

  return (
    <Comp ref={container} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </span>
    </Comp>
  );
}
