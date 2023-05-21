import Link from "next/link";

import { getBarbershopBySlug, getBarbershopSlugList } from "~/utils/db";

type PageProps = {
  params: {
    barbershop: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { barbershop: slug } = params;
  const barbershop = await getBarbershopBySlug(slug);

  if (!barbershop) {
    return <h1>Barbearia não encontrada</h1>;
  }

  return (
    <>
      <header>
        <h1>{barbershop.name}</h1>
      </header>
      <main>
        <h3>Vamos agendar sua proxima visita?</h3>
        <ul>
          <li>
            <Link href="/agendar">Agendar horário</Link>
          </li>
        </ul>
      </main>
      <footer>
        <ul>
          <li>
            <a href="#">Notificações</a>
          </li>
          <li>
            <Link href="/agendamentos">Meus agendamentos</Link>
          </li>
          <li>
            <Link href="/perfil">Meu perfil</Link>
          </li>
        </ul>
      </footer>
    </>
  );
}

export const revalidate = Infinity;

export const dynamicParams = false;

export async function generateStaticParams() {
  const barbershops = await getBarbershopSlugList();
  return barbershops.map((barbershop) => ({ barbershop: barbershop.slug }));
}
