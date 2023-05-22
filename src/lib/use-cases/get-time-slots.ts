import { sql } from "kysely";
import { db } from "~/lib/db";

const PERIOD_TIME = 20;
const MIN_ADVANCE_TIME = 60;
const INTERVAL_TIME = 10;

const setTime = (date: Date, time: string) => {
  const [hour, minute] = time.split(":");
  const dateClone = new Date(date);
  // TODO: check non-null assertion
  dateClone.setHours(parseInt(hour!));
  dateClone.setMinutes(parseInt(minute!));
  return dateClone;
};

export async function getTimeSlots(options: { barberId: number; date: Date }) {
  const targetDate = new Date(options.date);
  targetDate.setHours(0, 0, 0, 0);

  const workingHours = await db
    .selectFrom("WorkingHours")
    .selectAll()
    .where("WorkingHours.employeeId", "=", options.barberId)
    .where("WorkingHours.dayOfWeek", "=", sql`DAYOFWEEK(${targetDate})`)
    .execute();

  const timeSlots = [];
  for (const entry of workingHours) {
    let progressTime = setTime(targetDate, entry.startTime);
    while (progressTime < setTime(targetDate, entry.endTime)) {
      timeSlots.push(progressTime);
      progressTime = new Date(progressTime.getTime() + PERIOD_TIME * 60 * 1000);
    }
  }

  const appointments = await db
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
        appointment.date.getTime() + appointment.duration - timeSlot.getTime()
      );
      return diff > INTERVAL_TIME * 60 * 1000;
    });
    return isAvailable;
  });

  return availableTimeSlots;
}
