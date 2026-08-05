import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileQuestion,
  Headphones,
  LifeBuoy,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { fetchProjects } from "../../../services/project.service";
import { createSupportTicket, listSupportTickets } from "../../../services/support.service";
import type { Project } from "../../../types/project";

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  message: string;
  status: string;
  createdAt: string;
}

const Support: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Website");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSiteId, setSelectedSiteId] = useState<string | undefined>(searchParams.get("site") || undefined);

  const selectedProject = useMemo(() => {
    if (!projects.length) return null;
    if (selectedSiteId) {
      return projects.find((project) => project.id === selectedSiteId) || projects[0];
    }
    return projects[0];
  }, [projects, selectedSiteId]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
        if (!selectedSiteId && data.length > 0) {
          setSelectedSiteId(data[0].id);
        }
      } catch (err) {
        console.error("Unable to load projects for support", err);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [selectedSiteId]);

  useEffect(() => {
    const loadTickets = async () => {
      if (!selectedProject?.id || !selectedProject?.slug) {
        setTickets([]);
        return;
      }

      setLoading(true);
      try {
        const data = await listSupportTickets(selectedProject.id, selectedProject.slug);
        setTickets(data || []);
      } catch (err) {
        console.error("Unable to load support tickets", err);
      } finally {
        setLoading(false);
      }
    };

    void loadTickets();
  }, [selectedProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProject?.id || !selectedProject?.slug) {
      setError("Please select a website before submitting a request.");
      return;
    }

    if (!subject.trim() || !message.trim()) {
      setError("Please provide both a subject and a message.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const ticket = await createSupportTicket(
        {
          subject,
          category,
          message,
        },
        selectedProject.id,
        selectedProject.slug
      );

      setTickets((prev) => [ticket as SupportTicket, ...prev]);
      setSent(true);
      setSubject("");
      setCategory("Website");
      setMessage("");
    } catch (err) {
      console.error("Unable to submit support ticket", err);
      setError("Failed to submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How do I create a new website?",
      answer:
        "Go to your Dashboard and click New Website. You can start from a template or build your website from scratch.",
    },
    {
      question: "Can I connect my own domain?",
      answer:
        "Yes. After creating your website, you can connect your custom domain from the website management settings.",
    },
    {
      question: "Can I change my website template later?",
      answer:
        "You can manage your website and customize its design. Some template changes may depend on your current project setup.",
    },
    {
      question: "How can I upgrade my plan?",
      answer:
        "Open the Billing section from your dashboard and choose the plan that best fits your requirements.",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617] py-8 text-white sm:py-10 lg:py-12">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-[-100px] top-[30%] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-700/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-10">
        {/* =========================
            HERO
        ========================= */}
        <div className="mb-10 overflow-hidden rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 via-[#0b1224] to-blue-950/30">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute right-[-60px] top-[-80px] h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
                <Sparkles size={14} />
                BuildHub Support
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                How can we{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  help you?
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Get help with your websites, templates, domains, billing,
                account settings, and everything else you need to build
                something amazing.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                  <Clock3 size={16} className="text-emerald-400" />
                  Quick response
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                  <Headphones size={16} className="text-blue-400" />
                  Expert support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            SUPPORT OPTIONS
        ========================= */}
        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <SupportCard
            icon={<MessageCircle size={22} />}
            title="Live Chat"
            description="Chat with our support team and get help with your project."
            action="Start Chat"
            iconClass="bg-blue-500/10 text-blue-400"
          />

          <SupportCard
            icon={<Mail size={22} />}
            title="Email Support"
            description="Send us your question and our team will get back to you."
            action="Send Email"
            iconClass="bg-cyan-500/10 text-cyan-400"
          />

          <SupportCard
            icon={<FileQuestion size={22} />}
            title="Help Center"
            description="Find answers to common questions and learn how BuildHub works."
            action="Browse Help"
            iconClass="bg-violet-500/10 text-violet-400"
          />
        </div>

        {/* =========================
            CONTACT + TICKET
        ========================= */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* CONTACT FORM */}
          <div className="rounded-[24px] border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
            <div className="mb-7">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <LifeBuoy size={21} />
              </div>

              <h2 className="text-xl font-bold sm:text-2xl">
                Create a support request
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Tell us what you're facing and our team will help you resolve
                it.
              </p>
            </div>

            {sent ? (
              <div className="flex min-h-[310px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 size={30} />
                </div>

                <h3 className="text-xl font-bold">
                  Request submitted!
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Your message has been received. Our support team will get
                  back to you as soon as possible.
                </p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Website
                      </label>

                      <select
                        value={selectedSiteId}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          setSelectedSiteId(selectedId);
                          window.history.replaceState(null, "", `?site=${selectedId}`);
                        }}
                        className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-sm text-slate-300 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                      >
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Subject
                      </label>

                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="What do you need help with?"
                        className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Category
                      </label>

                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-sm text-slate-300 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                      >
                        <option>Website</option>
                        <option>Domain</option>
                        <option>Templates</option>
                        <option>Billing</option>
                        <option>Account</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Message
                    </label>

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      placeholder="Describe your problem..."
                      className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:-translate-y-0.5 hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    <Send size={17} />
                    {submitting ? "Submitting..." : "Submit Request"}
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-0.5"
                    />
                  </button>
                </form>

                {tickets.length > 0 && (
                  <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6">
                    <h3 className="mb-4 text-lg font-bold text-white">
                      My Support Tickets
                    </h3>

                    <div className="space-y-3">
                      {tickets.map((ticket) => (
                        <div key={ticket.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-white">{ticket.subject}</p>
                              <p className="text-xs text-slate-500">{ticket.category}</p>
                            </div>
                            <div className="text-xs text-slate-400">{new Date(ticket.createdAt).toLocaleString()}</div>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-400">{ticket.message}</p>
                          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                            <span>Status: {ticket.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* SUPPORT INFO */}
          <div className="space-y-5">
            <div className="rounded-[24px] border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Clock3 size={21} />
                </div>

                <div>
                  <h3 className="font-bold">Support availability</h3>
                  <p className="text-xs text-slate-500">
                    We're here when you need us
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Support status
                  </span>

                  <span className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>

                <div className="mt-4 h-px bg-slate-800" />

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Average response
                  </span>

                  <span className="font-semibold text-slate-300">
                    Under 24 hours
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-cyan-500/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h3 className="font-bold">
                    Need help getting started?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Our guides can help you create your first website, select
                    a template, connect your domain and launch your project.
                  </p>

                  <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300">
                    Explore guides
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            FAQ
        ========================= */}
        <div className="mb-10 rounded-[24px] border border-slate-800 bg-slate-900/50 p-5 sm:p-7 lg:p-8">
          <div className="mb-7">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Frequently Asked Questions
            </span>

            <h2 className="mt-2 text-2xl font-bold">
              Common questions
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Quick answers to some of the most common questions.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-xl border transition ${
                    isOpen
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-slate-800 bg-slate-950/50"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <span className="text-sm font-semibold text-slate-200">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-500 transition-transform ${
                        isOpen ? "rotate-180 text-blue-400" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-800 px-4 pb-5 pt-4 text-sm leading-6 text-slate-500 sm:px-5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================
            BOTTOM CTA
        ========================= */}
        <div className="overflow-hidden rounded-[24px] border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-slate-900 to-cyan-500/10 p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Headphones size={18} className="text-blue-400" />

                <span className="text-sm font-semibold text-blue-400">
                  We're here for you
                </span>
              </div>

              <h2 className="text-xl font-bold sm:text-2xl">
                Still need help?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Send us a message and our team will help you find the right
                solution.
              </p>
            </div>

            <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200">
              Contact Support
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================
   SUPPORT CARD
========================= */

const SupportCard = ({
  icon,
  title,
  description,
  action,
  iconClass,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  iconClass: string;
}) => {
  return (
    <div className="group rounded-[22px] border border-slate-800 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <ArrowRight
          size={18}
          className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-blue-400"
        />
      </div>

      <h3 className="text-lg font-bold">{title}</h3>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
        {description}
      </p>

      <button className="mt-5 text-sm font-semibold text-blue-400 transition hover:text-blue-300">
        {action}
      </button>
    </div>
  );
};

export default Support;