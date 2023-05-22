import Link from "next/link";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <aside className="mx-auto pt-6 lg:max-w-2xl">
        <Link href="/">Voltar</Link>
      </aside>
      <main className="mx-auto py-6 lg:max-w-2xl">{children}</main>
    </>
  );
}
