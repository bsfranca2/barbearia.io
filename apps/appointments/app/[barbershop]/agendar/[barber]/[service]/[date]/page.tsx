import Link from "next/link";

export default function Page() {
  // TODO: fetch times from API

  return (
    <section>
      <h3>Escolher hora</h3>
      <ul>
        <li>
          <Link href="/agendar/fulano/corte-1/10/9">09:00</Link>
        </li>
        <li>
          <Link href="/agendar/fulano/corte-1/10/91">09:15</Link>
        </li>
        <li>
          <Link href="/agendar/fulano/corte-1/10/92">09:30</Link>
        </li>
      </ul>
    </section>
  );
}
