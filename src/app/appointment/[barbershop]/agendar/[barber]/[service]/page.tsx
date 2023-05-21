import Link from "next/link";
import { format } from "date-fns";

type PageProps = {
  params: {
    barbershop: string;
    barber: string;
    service: string;
  };
};

export default function Page({ params }: PageProps) {
  const { barber, service } = params;

  // TODO: fetch dates from API
  const dates = [new Date(2023, 3, 3), new Date(2023, 3, 4)];

  return (
    <section>
      <h3>Escolher dia</h3>
      <ul>
        {dates.map((date) => (
          <li key={date.getTime()}>
            <Link href={`/agendar/${barber}/${service}/${format(date, "yyyy-MM-dd")}`}>
              {format(date, "dd/MM/yyyy")}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
