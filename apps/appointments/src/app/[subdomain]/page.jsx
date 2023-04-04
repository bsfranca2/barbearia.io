export default function Page({ params }) {
  return (
    <div>
      <h1>Page</h1>
      <p>Subdomain: {params.subdomain}</p>
    </div>
  );
}
