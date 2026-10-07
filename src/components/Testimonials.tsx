"use client";

import { AnimatedIcon } from "@/components/AnimatedIcon";
import { SiteImage } from "@/components/SiteImage";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Testimonial } from "@/data/content";

function videoEmbed(url: string) {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const { locale, tr } = useLanguage();
  const [open, close] = locale === "fr" ? ["« ", " »"] : ["“", "”"];
  return (
    <RevealGroup
      stagger={0.12}
      className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
    >
      {items.map((t) => {
        const embed = t.videoUrl ? videoEmbed(t.videoUrl) : null;
        const isFile = Boolean(t.videoUrl?.match(/\.(mp4|webm|ogg)(\?|$)/i));

        return (
          <RevealItem
            as="blockquote"
            key={`${t.name.fr}-${t.role.fr}`}
            data-icon-trigger
            className="group flex w-[85%] shrink-0 snap-center flex-col border-l-2 border-gold bg-white p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(8,31,66,0.08)] sm:w-[60%] lg:w-auto"
          >
            <AnimatedIcon name="quote" size={40} trigger="in-view" className="mb-4" />
            {embed ? (
              <div className="mb-5 aspect-video overflow-hidden bg-primary-darker">
                <iframe
                  src={embed}
                  title={tr(t.name)}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : isFile && t.videoUrl ? (
              <video
                className="mb-5 aspect-video w-full bg-primary-darker object-cover"
                controls
                preload="metadata"
                poster={t.photo}
              >
                <source src={t.videoUrl} />
              </video>
            ) : t.photo ? (
              <SiteImage
                src={t.photo}
                alt=""
                className="mb-5 h-16 w-16 object-cover"
              />
            ) : null}
            <p className="text-lg leading-relaxed text-ink/85">
              {open}
              {tr(t.quote)}
              {close}
            </p>
            <footer className="mt-6">
              <cite className="not-italic font-heading text-navy">{tr(t.name)}</cite>
              <p className="mt-1 text-sm text-ink/60">{tr(t.role)}</p>
            </footer>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
