"use client";

import { m, type HTMLMotionProps, type Variants } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const tags = {
  div: m.div,
  section: m.section,
  article: m.article,
  ul: m.ul,
  li: m.li,
  p: m.p,
  span: m.span,
  h2: m.h2,
  blockquote: m.blockquote,
  aside: m.aside,
};

type Tag = keyof typeof tags;

type RevealProps = HTMLMotionProps<"div"> & {
  as?: Tag;
  delay?: number;
  y?: number;
};

/** Apparition en fondu + montée quand l'élément entre dans le viewport. */
export function Reveal({ as = "div", delay = 0, y = 24, children, ...rest }: RevealProps) {
  const Comp = tags[as] as typeof m.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

const group: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

/** Conteneur dont les enfants `RevealItem` apparaissent en cascade. */
export function RevealGroup({
  as = "div",
  stagger = 0.08,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { as?: Tag; stagger?: number }) {
  const Comp = tags[as] as typeof m.div;
  return (
    <Comp
      variants={group}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  as = "div",
  children,
  ...rest
}: HTMLMotionProps<"div"> & { as?: Tag }) {
  const Comp = tags[as] as typeof m.div;
  return (
    <Comp variants={item} {...rest}>
      {children}
    </Comp>
  );
}
