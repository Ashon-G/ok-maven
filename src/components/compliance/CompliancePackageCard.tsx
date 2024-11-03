import React from "react";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface CompliancePackageCardProps {
  name: string;
  price: number;
  period: string;
  features: string[];
  isSelected: boolean;
  onToggle: () => void;
}

export const CompliancePackageCard = ({
  name,
  price,
  period,
  features,
  isSelected,
  onToggle,
}: CompliancePackageCardProps) => (
  <div
    className={`bg-white rounded-2xl border p-6 shadow-sm transition-colors ${
      isSelected ? "border-secondary" : "border-border"
    }`}
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-bold">${price}</span>
          <span className="text-black">{period}</span>
        </div>
      </div>
      <Switch checked={isSelected} onCheckedChange={onToggle} />
    </div>

    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3">
          <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
          <span className="text-black">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);