import Link from "next/link";
import { format } from "date-fns";
import { getTimeSlots } from "~/lib/use-cases/get-time-slots";

type TimePickerProps = {
  barber: string;
  service: string;
  date: string;
};

export async function TimePicker({
  barber,
  service,
  date: dateString,
}: TimePickerProps) {
  const barberId = parseInt(barber);
  const [year, month, day] = dateString.split("-").map((x) => parseInt(x));
  // TODO: check non-null assertion
  const date = new Date(year!, month! - 1, day);
  const timeSlots = await getTimeSlots({ barberId, date });

  return (
    <section className="py-4">
      <h3>Escolher hora ({dateString})</h3>
      <ul className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {timeSlots.map((timeSlot) => (
          <li key={timeSlot.getTime()}>
            <Link
              href={`/agendar/${barberId}/${service}/${dateString}/${format(
                timeSlot,
                "HH:mm"
              )}`}
              className="flex flex-row justify-between rounded-lg border border-input px-4 py-2"
              prefetch={false}
            >
              {format(timeSlot, "HH:mm")}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
