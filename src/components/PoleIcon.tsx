import { Droplets, Building2, Zap, Waypoints } from "lucide-react";
import type { ServiceId } from "@/data/content";

const map = {
  eau: Droplets,
  btp: Building2,
  electricite: Zap,
  commerce: Waypoints,
};

export function PoleIcon({
  id,
  className = "size-7",
}: {
  id: ServiceId;
  className?: string;
}) {
  const Icon = map[id];
  return <Icon className={className} strokeWidth={1.6} aria-hidden />;
}
