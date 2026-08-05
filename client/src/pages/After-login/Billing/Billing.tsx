import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  CreditCard,
  Download,
  FileText,
  Globe2,
  HardDrive,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { fetchProjects } from "../../../services/project.service";
import type { Project } from "../../../types/project";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
}

const invoices: Invoice[] = [
  {
    id: "INV-2026-001",
    date: "Jul 01, 2026",
    amount: "$0.00",
    status: "Paid",
  },
  {
    id: "INV-2026-002",
    date: "Jun 01, 2026",
    amount: "$0.00",
    status: "Paid",
  },
  {
    id: "INV-2026-003",
    date: "May 01, 2026",
    amount: "$0.00",
    status: "Paid",
  },
];

const Billing: React.FC = () => {
  const { user } = useAuth();
  const [showPlans, setShowPlans] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Unable to load billing data", error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const totalVisitors = projects.reduce((sum, project) => sum + (project.visits || 0), 0);
  const currentPlan = user?.plan || "Free Plan";
  const formattedVisitors = totalVisitors >= 1000 ? `${(totalVisitors / 1000).toFixed(1)}K` : String(totalVisitors);

  return (
    <section className="min-h-screen bg-[#020617] px-4 py-6 text-white sm:px-6 lg:px-10 lg:py-8">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-[-120px] top-[35%] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
                  <CreditCard size={23} />
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-400">
                    Account & Payments
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    Billing
                  </h1>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Manage your subscription, payment methods, usage and billing
                history from one place.
              </p>
            </div>

            <button
              onClick={() => setShowPlans(true)}
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30"
            >
              <Sparkles size={17} />

              Upgrade Plan

              <ArrowUpRight
                size={16}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        {/* =========================
            CURRENT PLAN
        ========================= */}
        <section className="mb-8">
          <div className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-slate-900/80 to-cyan-500/5">
            <div className="p-5 sm:p-7 lg:p-8">
              <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
                    <Zap size={25} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold sm:text-2xl">
                        Free Plan
                      </h2>

                      <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-400">
                        CURRENT PLAN
                      </span>
                    </div>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                      Perfect for getting started with BuildHub and creating
                      your first website.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setShowPlans(true)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
                  >
                    <Sparkles size={16} />
                    View Plans
                  </button>

                  <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-white"
                  >
                    Manage Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Plan Features */}
            <div className="grid border-t border-blue-500/10 sm:grid-cols-2 lg:grid-cols-4">
              <PlanFeature
                icon={<Globe2 size={17} />}
                label="Websites"
                value={`${projects.length} / 3`}
              />

              <PlanFeature
                icon={<HardDrive size={17} />}
                label="Storage"
                value="500 MB"
              />

              <PlanFeature
                icon={<Users size={17} />}
                label="Visitors"
                value={`${formattedVisitors} / month`}
              />

              <PlanFeature
                icon={<ShieldCheck size={17} />}
                label="SSL Security"
                value="Included"
              />
            </div>
          </div>
        </section>

        {/* =========================
            USAGE
        ========================= */}
        <section className="mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold sm:text-2xl">
              Usage Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monitor your current resource usage.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <UsageCard
              icon={<Globe2 size={19} />}
              title="Websites"
              used="3"
              total="3"
              percentage={100}
            />

            <UsageCard
              icon={<HardDrive size={19} />}
              title="Storage"
              used="320 MB"
              total="500 MB"
              percentage={64}
            />

            <UsageCard
              icon={<Users size={19} />}
              title="Monthly Visitors"
              used="2.1K"
              total="5K"
              percentage={42}
            />
          </div>
        </section>

        {/* =========================
            PAYMENT + BILLING SUMMARY
        ========================= */}
        <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* PAYMENT METHOD */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold sm:text-xl">
                  Payment Method
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your default payment information.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                <CreditCard size={18} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800">
                    <CreditCard size={19} className="text-slate-300" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      No payment method
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Add a card when upgrading your plan.
                    </p>
                  </div>
                </div>

                <button className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-white">
                  Add Method
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <p className="text-xs leading-5 text-slate-400">
                Your payment information is securely processed and protected.
              </p>
            </div>
          </div>

          {/* BILLING SUMMARY */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold sm:text-xl">
                  Billing Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current billing information.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                <TrendingUp size={18} />
              </div>
            </div>

            <div className="space-y-4">
              <SummaryRow
                label="Current Plan"
                value="Free"
              />

              <SummaryRow
                label="Billing Cycle"
                value="Monthly"
              />

              <SummaryRow
                label="Next Billing Date"
                value="Not applicable"
              />

              <div className="border-t border-slate-800 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-400">
                    Current Total
                  </span>

                  <span className="text-2xl font-bold text-white">
                    $0.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            INVOICE HISTORY
        ========================= */}
        <section className="mb-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Invoice History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and download your previous invoices.
              </p>
            </div>

            <span className="w-fit rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-500">
              {invoices.length} Invoices
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
            {/* Desktop Header */}
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_80px] border-b border-slate-800 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600 md:grid">
              <span>Invoice</span>
              <span>Date</span>
              <span>Amount</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-slate-800">
              {invoices.map((invoice) => (
                <InvoiceRow
                  key={invoice.id}
                  invoice={invoice}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =========================
            UPGRADE CTA
        ========================= */}
        <section className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-slate-900/80 to-cyan-500/10">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-blue-400" />

                  <span className="text-sm font-semibold text-blue-400">
                    Unlock more possibilities
                  </span>
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Ready to grow your websites?
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Upgrade your BuildHub plan to unlock more websites,
                  additional storage, advanced analytics and premium features.
                </p>
              </div>

              <button
                onClick={() => setShowPlans(true)}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30"
              >
                Explore Plans
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* =========================
          PLAN MODAL
      ========================= */}
      {showPlans && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-4xl rounded-3xl border border-slate-800 bg-[#0b1224] p-5 shadow-2xl sm:p-7">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles size={18} className="text-blue-400" />

                  <span className="text-sm font-semibold text-blue-400">
                    BuildHub Plans
                  </span>
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Choose your plan
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Pick the plan that fits your website needs.
                </p>
              </div>

              <button
                onClick={() => setShowPlans(false)}
                className="self-start rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-400 transition hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <PricingCard
                name="Free"
                price="$0"
                description="For getting started."
                features={[
                  "3 Websites",
                  "500 MB Storage",
                  "Basic Analytics",
                ]}
                current
              />

              <PricingCard
                name="Pro"
                price="$19"
                description="For growing businesses."
                features={[
                  "10 Websites",
                  "10 GB Storage",
                  "Advanced Analytics",
                  "Custom Domains",
                ]}
                popular
              />

              <PricingCard
                name="Business"
                price="$49"
                description="For serious creators."
                features={[
                  "Unlimited Websites",
                  "50 GB Storage",
                  "Premium Analytics",
                  "Priority Support",
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* =========================
   PLAN FEATURE
========================= */

const PlanFeature = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-3 border-b border-blue-500/10 p-4 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>

        <p className="mt-0.5 truncate text-sm font-semibold text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
};

/* =========================
   USAGE CARD
========================= */

const UsageCard = ({
  icon,
  title,
  used,
  total,
  percentage,
}: {
  icon: React.ReactNode;
  title: string;
  used: string;
  total: string;
  percentage: number;
}) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:-translate-y-0.5 hover:border-blue-500/30">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            {icon}
          </div>

          <span className="text-sm font-semibold text-slate-300">
            {title}
          </span>
        </div>

        <span className="text-xs font-semibold text-blue-400">
          {percentage}%
        </span>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-white">{used}</p>

        <p className="text-xs text-slate-600">of {total}</p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-slate-600">
        {percentage >= 90
          ? "You're close to your limit."
          : "You're within your current plan limit."}
      </p>
    </div>
  );
};

/* =========================
   SUMMARY ROW
========================= */

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="text-sm font-semibold text-slate-200">
        {value}
      </span>
    </div>
  );
};

/* =========================
   INVOICE ROW
========================= */

const InvoiceRow = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-5 py-5 transition hover:bg-slate-800/30 md:grid-cols-[1.5fr_1fr_1fr_80px] md:items-center">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
          <FileText size={17} />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            {invoice.id}
          </p>

          <span className="mt-1 inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            {invoice.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between md:block">
        <span className="text-xs text-slate-600 md:hidden">
          Date
        </span>

        <span className="text-sm text-slate-400">
          {invoice.date}
        </span>
      </div>

      <div className="flex items-center justify-between md:block">
        <span className="text-xs text-slate-600 md:hidden">
          Amount
        </span>

        <span className="text-sm font-semibold text-slate-200">
          {invoice.amount}
        </span>
      </div>

      <div className="flex justify-end border-t border-slate-800 pt-3 md:border-0 md:pt-0">
        <button
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-blue-500/40 hover:text-white"
          title="Download invoice"
        >
          <Download size={14} />

          <span className="md:hidden">
            Download
          </span>
        </button>
      </div>
    </div>
  );
};

/* =========================
   PRICING CARD
========================= */

const PricingCard = ({
  name,
  price,
  description,
  features,
  current,
  popular,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  current?: boolean;
  popular?: boolean;
}) => {
  return (
    <div
      className={`relative rounded-2xl border p-5 ${
        popular
          ? "border-blue-500/50 bg-blue-500/5 shadow-lg shadow-blue-500/10"
          : "border-slate-800 bg-slate-900/60"
      }`}
    >
      {popular && (
        <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white">
          POPULAR
        </span>
      )}

      <h3 className="text-lg font-bold">{name}</h3>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>

      <div className="mt-5 flex items-end gap-1">
        <span className="text-3xl font-bold">{price}</span>

        {price !== "$0" && (
          <span className="mb-1 text-xs text-slate-600">
            / month
          </span>
        )}
      </div>

      <div className="my-5 h-px bg-slate-800" />

      <div className="space-y-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-xs text-slate-400"
          >
            <Check
              size={14}
              className="shrink-0 text-emerald-400"
            />

            {feature}
          </div>
        ))}
      </div>

      <button
        disabled={current}
        className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
          current
            ? "cursor-default bg-slate-800 text-slate-500"
            : popular
            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:opacity-90"
            : "border border-slate-700 bg-slate-800 text-slate-200 hover:border-blue-500/40"
        }`}
      >
        {current ? "Current Plan" : "Choose Plan"}
      </button>
    </div>
  );
};

export default Billing;