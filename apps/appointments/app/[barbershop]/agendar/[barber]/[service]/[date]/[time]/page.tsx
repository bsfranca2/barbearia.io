type PageProps = {
  params: unknown;
};

export default function Page({ params }: PageProps) {
  return (
    <main>
      <h3>Confirmar</h3>
      <code>{JSON.stringify(params, null, 2)}</code>
    </main>
  );
}
