import Link from "next/link";

export default function Page() {
  // TODO: fetch dates from API

  return (
    <section>
      <h3>Escolher dia</h3>
      <ul>
        <li>
          <Link href="/agendar/fulano/corte-1/10">01/01</Link>
        </li>
        <li>
          <Link href="/agendar/fulano/corte-1/10">02/01</Link>
        </li>
        <li>
          <Link href="/agendar/fulano/corte-1/10">03/01</Link>
        </li>
      </ul>
    </section>
  );
}
