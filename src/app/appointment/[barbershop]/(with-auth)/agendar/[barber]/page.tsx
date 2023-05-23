import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getEmployeeServicesUseCase } from "~/lib/use-cases/get-services";
import { buttonVariants } from "~/components/ui/button";
import { ServiceCard } from "~/components/dashboard/service-card";

type PageProps = {
  params: { barbershop: string; barber: string };
};

export default async function Page({ params }: PageProps) {
  const services = await getEmployeeServicesUseCase({
    employeeId: Number(params.barber),
  });

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Escolha um serviço
      </h3>
      <div className="pt-6">
        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard
              key={service.employeeServiceId}
              name={service.name}
              price={parseFloat(service.customPrice ?? service.price)}
              duration={service.customDuration ?? service.duration}
              action={
                <Link
                  href={`/agendar/${params.barber}/${service.employeeServiceId}`}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
