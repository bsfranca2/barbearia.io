import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getServices } from "~/lib/use-cases/get-services";
import { buttonVariants } from "~/components/ui/button";

type PageProps = {
  params: { barbershop: string; barber: string };
};

export default async function Page({ params }: PageProps) {
  const services = await getServices(params.barber);

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Escolha um serviço
      </h3>
      <div className="pt-6">
        <ul className="space-y-4">
          {services.map((service) => (
            <li
              key={service.id}
              className="flex flex-row items-center justify-between rounded-lg border border-input px-3 py-2.5"
            >
              <p className="font-medium">{service.name}</p>
              <Link
                href={`/agendar/${params.barber}/${service.id}`}
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
