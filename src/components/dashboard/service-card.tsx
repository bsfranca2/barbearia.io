import * as React from "react";
import { Timer } from "lucide-react";

type ServiceCardProps = {
  name: string;
  price: number;
  duration: number;
  action?: React.ReactNode;
};

export function ServiceCard({
  name,
  price,
  duration,
  action,
}: ServiceCardProps) {
  const priceFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  const durationFormatted = new Intl.NumberFormat("pt-BR", {
    style: "unit",
    unit: "minute",
  }).format(duration);

  return (
    <div className="flex flex-row justify-between rounded-lg border border-input px-3 py-2.5">
      <div className="flex flex-col">
        <div className="font-medium">{name}</div>
        <div className="flex flex-row space-x-2 text-sm text-slate-500">
          <div className="w-[75px]	min-w-fit">{priceFormatted}</div>
          <div className="flex items-center">
            <div className="mr-0.5">
              <Timer size={14} />
            </div>
            {durationFormatted}
          </div>
        </div>
      </div>
      <div className="self-center">{action}</div>
    </div>
  );
}
