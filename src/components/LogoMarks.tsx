import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconEau(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        {...stroke}
        d="M12 3.2C12 3.2 6.4 10.4 6.4 14.3a5.6 5.6 0 1 0 11.2 0C17.6 10.4 12 3.2 12 3.2Z"
      />
    </svg>
  );
}

export function IconBatiment(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path {...stroke} d="M5.2 20.2V8.4L12 4l6.8 4.4v11.8" />
      <path {...stroke} d="M10 20.2v-4h4v4" />
      <path
        d="M9.1 10h1.5v1.4H9.1Zm4.3 0h1.5v1.4h-1.5ZM9.1 13.2h1.5v1.4H9.1Zm4.3 0h1.5v1.4h-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconElectricite(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        {...stroke}
        d="M13.4 3.4 8.2 12.4h4.1L10.6 20.6l6.8-10.2h-4.3L13.4 3.4Z"
      />
    </svg>
  );
}

export function IconRoute(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path {...stroke} d="M8.2 20.2 11 3.8" />
      <path {...stroke} d="M15.8 20.2 13 3.8" />
      <path {...stroke} strokeDasharray="0.2 3.2" d="M12 6.4v12" />
    </svg>
  );
}
