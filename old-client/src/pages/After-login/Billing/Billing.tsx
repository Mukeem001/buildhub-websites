const Billing = () => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="mt-4 text-slate-400">Manage your subscription, payments, and invoices.</p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">No billing activity yet.</p>
          <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm text-slate-300">
            Update your plan and billing details from here.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Billing;
