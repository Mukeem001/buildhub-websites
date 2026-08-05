import {
  Plus,
  UserPlus,
  LayoutTemplate,
  BarChart3,
  Globe,
  CreditCard,
} from "lucide-react";

const actions = [
  {
    title: "Create Website",
    description: "Launch a new AI website",
    icon: Globe,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Add User",
    description: "Invite a new customer",
    icon: UserPlus,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "Upload Template",
    description: "Publish a template",
    icon: LayoutTemplate,
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    title: "Analytics",
    description: "View reports",
    icon: BarChart3,
    color: "bg-orange-500/10 text-orange-400",
  },
];

interface QuickActionsProps {
  onCreateWebsite: () => void;
}

const QuickActions = ({ onCreateWebsite }: QuickActionsProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Quick Actions
        </h2>

        <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
          <Plus className="mr-2 inline-block h-4 w-4" />
          New
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          const isCreateWebsite = action.title === "Create Website";

          return (
            <button
              key={action.title}
              onClick={isCreateWebsite ? onCreateWebsite : undefined}
              className="group rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon size={22} />
              </div>

              <h3 className="font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;