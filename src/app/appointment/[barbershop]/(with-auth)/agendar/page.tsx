import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getBarbersUseCase } from "~/lib/use-cases/get-barbers";
import { buttonVariants } from "~/components/ui/button";

type PageProps = {
  params: { barbershop: string };
};

export default async function Page({ params }: PageProps) {
  const barbers = await getBarbersUseCase({
    barbershopSlug: params.barbershop,
  });

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Escolha um profissional
      </h3>
      <div className="pt-6">
        <ul className="space-y-4">
          {barbers.map((barber) => (
            <li
              key={barber.id}
              className="flex flex-row items-center justify-between rounded-lg border border-input px-3 py-2.5"
            >
              <p className="font-medium">{barber.name}</p>
              <Link
                href={`/agendar/${barber.id}`}
                className={buttonVariants({ variant: "secondary" })}
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
