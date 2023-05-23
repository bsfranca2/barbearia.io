import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { getBarbershopBySlug } from "./getBarbershop";

type PageProps = {
  params: {
    barbershop: string;
  };
};

export default async function Page({
  params: { barbershop: slug },
}: PageProps) {
  const barbershop = await getBarbershopBySlug({ slug });

  if (!barbershop) {
    return <h1>Barbearia não encontrada</h1>;
  }

  return (
    <>
      <header>{/* Logo */}</header>
      <main className="mx-auto py-6 lg:max-w-2xl">
        <div className="mb-6">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
            {barbershop.name}
          </h2>
          <p className="text-muted-foreground">
            Vamos agendar sua proxima visita?
          </p>
        </div>
        <Link href="/agendar" className={buttonVariants()}>
          Agendar horário
        </Link>
      </main>
      <footer className="hidden">
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

// export const revalidate = Infinity;

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   const barbershops = await getBarbershopSlugList();
//   return barbershops.map((barbershop) => ({ barbershop: barbershop.slug }));
// }
