import Link from "next/link";

import { getConnection } from "@barbearia.io/db";

type PageProps = {
  params: { barbershop: string; barber: string };
};

export default async function Page({ params }: PageProps) {
  const services = await getConnection()
    .selectFrom("EmployeeService")
    .innerJoin("Service", "Service.id", "EmployeeService.serviceId")
    .where("EmployeeService.employeeId", "=", Number(params.barber))
    .select("EmployeeService.id")
    .select("Service.name")
    .execute();

  return (
    <section>
      <h3>Escolher serviço</h3>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <Link href={`/agendar/${params.barber}/${service.id}`}>{service.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
