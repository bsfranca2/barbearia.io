"use client";

import { format } from "date-fns";
// import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";

function datesOfWeek(date: Date): Date[] {
  const day = date.getDay();
  const diff = date.getDate() - day; // subtract the day of the week
  const sunday = new Date(date.setDate(diff));
  const weekDates = [new Date(sunday)];

  for (let i = 1; i < 7; i++) {
    const nextDay = new Date(sunday);
    nextDay.setDate(sunday.getDate() + i);
    weekDates.push(nextDay);
  }

  return weekDates;
}

export function DatePicker() {
  const week = datesOfWeek(new Date());
  //   const searchParams = useSearchParams()
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex space-x-2">
      {week.map((date) => (
        <Day
          key={date.getTime()}
          date={new Date(date)}
          onClick={(dateString) =>
            router.push(`${pathname!}?date=${dateString}`)
          }
        />
      ))}
    </div>
  );
}

const dayOfWeek = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
};

export function Day({
  date,
  onClick,
}: {
  date: Date;
  onClick: (dateString: string) => void;
}) {
  return (
    <button
      className="flex select-none flex-col items-center justify-center rounded-lg border border-input px-1.5 pb-1 pt-1.5"
      onClick={() => onClick(format(date, "yyyy-MM-dd"))}
    >
      <p className="text-xs tracking-tighter">
        {dayOfWeek[date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6].toUpperCase()}
      </p>
      <p className="text-xl tracking-tighter">{date.getDate()}</p>
    </button>
  );
}
