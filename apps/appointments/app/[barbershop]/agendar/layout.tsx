import Link from "next/link";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <aside>
        <Link href="/">Voltar</Link>
      </aside>
      {children}
    </>
  );
}
