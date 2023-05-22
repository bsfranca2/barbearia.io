import Link from "next/link";
import { format } from "date-fns";
import { getTimeSlots } from "~/lib/use-cases/get-time-slots";

type PageProps = {
  params: {
    barbershop: string;
    barber: string;
    service: string;
    date: string;
  };
};

export default async function Page({ params }: PageProps) {
  const barberId = parseInt(params.barber);
  const [year, month, day] = params.date.split("-").map((x) => parseInt(x));
  // TODO: check non-null assertion
  const date = new Date(year!, month! - 1, day);

  const timeSlots = await getTimeSlots({ barberId, date });

  return (
    <section>
      <h3>Escolher hora</h3>
      <ul>
        {timeSlots.map((timeSlot) => (
          <li key={timeSlot.getTime()}>
            <Link
              href={`/agendar/${barberId}/${params.service}/${
                params.date
              }/${format(timeSlot, "HH:mm")}`}
            >
              {format(timeSlot, "HH:mm")}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
