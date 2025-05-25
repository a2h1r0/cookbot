import Header from '@/components/layout/Header';

export default function HomePage() {
  return (
    <div className="p-4">
      <Header />

      <main className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-4">home</h2>
        </section>
      </main>
    </div>
  );
}
