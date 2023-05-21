import Link from "next/link";
import { format } from "date-fns";
import { sql } from "kysely";

import { getConnection } from "~/utils/db";

const PERIOD_TIME = 20;
const MIN_ADVANCE_TIME = 60;
const INTERVAL_TIME = 10;

const setTime = (date: Date, time: string) => {
  const [hour, minute] = time.split(":");
  const dateClone = new Date(date);
  dateClone.setHours(parseInt(hour));
  dateClone.setMinutes(parseInt(minute));
  return dateClone;
};

const timeToInteger = (time: string) => {
  const [hour, minute] = time.split(":");
  return parseInt(hour) * 60 + parseInt(minute);
};

async function getTimeSlots(options: { barberId: number; date: Date }) {
  const targetDate = new Date(options.date);
  targetDate.setHours(0, 0, 0, 0);

  const workingHours = await getConnection()
    .selectFrom("WorkingHours")
    .selectAll()
    .where("WorkingHours.employeeId", "=", options.barberId)
    .where("WorkingHours.dayOfWeek", "=", sql`DAYOFWEEK(${targetDate})`)
    .execute();

  const timeSlots = [];
  for (const entry of workingHours) {
    let progressTime = setTime(targetDate, entry.startAt);
    while (progressTime < setTime(targetDate, entry.endAt)) {
      timeSlots.push(progressTime);
      progressTime = new Date(progressTime.getTime() + PERIOD_TIME * 60 * 1000);
    }
  }

  const appointments = await getConnection()
    .selectFrom("Appointment")
    .selectAll("Appointment")
    .innerJoin(
      "EmployeeService",
      "EmployeeService.id",
      "Appointment.employeeServiceId"
    )
    .where("EmployeeService.employeeId", "=", options.barberId)
    .execute();

  const availableTimeSlots = timeSlots.filter((timeSlot) => {
    const isAvailable = appointments.every((appointment) => {
      const diff = Math.abs(
        appointment.date.getTime() +
          timeToInteger(appointment.duration) -
          timeSlot.getTime()
      );
      return diff > INTERVAL_TIME * 60 * 1000;
    });
    return isAvailable;
  });

  return availableTimeSlots;
}

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
  const date = new Date(year, month - 1, day);

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
