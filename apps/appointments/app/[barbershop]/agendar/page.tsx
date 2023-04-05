import Link from "next/link";

import { getConnection } from "@barbearia.io/db";

type PageProps = {
  params: { barbershop: string };
};

export default async function Page({ params }: PageProps) {
  /// TODO: Show barber availability
  const barbers = await getConnection()
    .selectFrom("Employee")
    .select("Employee.id")
    .select("Employee.name")
    .innerJoin("Barbershop", "Barbershop.id", "Employee.barbershopId")
    .where("Barbershop.slug", "=", params.barbershop)
    .execute();

  return (
    <main>
      <h3>Escolher profissional</h3>
      <ul>
        {barbers.map((barber) => (
          <li key={barber.id}>
            <Link href={`/agendar/${barber.id}`}>{barber.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
