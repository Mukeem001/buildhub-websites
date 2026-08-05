const Websites = () => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-3xl font-bold">Websites</h1>
        <p className="mt-4 text-slate-400">Manage your published websites here.</p>

        {/* Placeholder grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="h-40 rounded-lg bg-slate-800" />
              <h3 className="mt-3 font-semibold">Website {i + 1}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Websites;
