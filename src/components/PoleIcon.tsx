import { Compass, Droplets, Building2, Zap, Package, Handshake } from "lucide-react";
import type { PillarId } from "@/data/pillars";

const map = {
  etudes: Compass,
  hydraulique: Droplets,
  "genie-civil": Building2,
  electricite: Zap,
  commerce: Package,
  prestation: Handshake,
};

export function PoleIcon({
  id,
  className = "size-7",
}: {
  id: PillarId;
  className?: string;
}) {
  const Icon = map[id];
  return <Icon className={className} strokeWidth={1.6} aria-hidden />;
}
