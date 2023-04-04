export default function Page({ params }) {
  return (
    <div>
      <h1>Barbearia.io</h1>
      <h2>Page</h2>
      <p>Subdomain: {params.subdomain}</p>
    </div>
  );
}
