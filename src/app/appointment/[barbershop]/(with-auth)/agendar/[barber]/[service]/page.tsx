import { Suspense } from "react";
import { DatePicker } from "./date-picker";
import { TimePicker } from "./time-picker";
import { format } from "date-fns";

type PageProps = {
  params: {
    barbershop: string;
    barber: string;
    service: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params, searchParams }: PageProps) {
  const { barber, service } = params;
  const selectedDate =
    typeof searchParams.date === "string"
      ? searchParams.date
      : format(new Date(), "yyyy-MM-dd");

  return (
    <main>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Escolha uma data
      </h3>
      <div className="pt-6">
        <DatePicker />
        <Suspense fallback={<p>Loading times...</p>}>
          {/* @ts-expect-error Server Component */}
          <TimePicker barber={barber} service={service} date={selectedDate} />
        </Suspense>
      </div>
    </main>
  );
}
