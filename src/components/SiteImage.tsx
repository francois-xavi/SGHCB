type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function SiteImage({ src, alt, className, priority }: Props) {
  return (
    // Native img: skip /_next/image so Unsplash is not proxied (slow on first load).
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
    />
  );
}
