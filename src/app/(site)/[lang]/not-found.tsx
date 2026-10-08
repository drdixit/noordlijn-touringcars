import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-site py-24 text-center" data-testid="not-found">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-bold">Pagina niet gevonden / Page not found</h1>
      <Link href="/nl" className="mt-6 inline-block font-semibold text-signal-600 underline">Home</Link>
    </section>
  );
}
