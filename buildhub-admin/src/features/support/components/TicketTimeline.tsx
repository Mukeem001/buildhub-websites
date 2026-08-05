import {
  Clock3,
  UserCheck,
  MessageSquare,
  Flag,
  Paperclip,
  CheckCircle2,
} from "lucide-react";

export interface TimelineEvent {
  id: number;
  type:
    | "created"
    | "assigned"
    | "reply"
    | "priority"
    | "attachment"
    | "resolved";

  title: string;

  description: string;

  createdAt: string;

  user: string;
}

interface TicketTimelineProps {
  events: TimelineEvent[];
}

const iconMap = {
  created: Clock3,
  assigned: UserCheck,
  reply: MessageSquare,
  priority: Flag,
  attachment: Paperclip,
  resolved: CheckCircle2,
};

const colorMap = {
  created: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  assigned: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  reply: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  priority: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  attachment: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const TicketTimeline = ({
  events,
}: TicketTimelineProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">

      {/* Header */}

      <div className="border-b border-zinc-800 p-5">

        <h2 className="text-lg font-semibold text-white">
          Ticket Timeline
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Complete activity history for this ticket.
        </p>

      </div>

      {/* Timeline */}

      <div className="relative p-6">

        {/* Vertical Line */}

        <div className="absolute left-10 top-0 bottom-0 w-px bg-zinc-800" />

        <div className="space-y-8">

          {events.map((event) => {
            const Icon = iconMap[event.type];

            return (
              <div
                key={event.id}
                className="relative flex gap-5"
              >
                {/* Icon */}

                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border ${
                    colorMap[event.type]
                  }`}
                >
                  <Icon size={18} />
                </div>

                {/* Content */}

                <div className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-cyan-500/40">

                  <div className="flex flex-wrap items-center justify-between gap-2">

                    <h3 className="font-semibold text-white">
                      {event.title}
                    </h3>

                    <span className="text-xs text-zinc-500">
                      {event.createdAt}
                    </span>

                  </div>

                  <p className="mt-3 leading-7 text-zinc-400">
                    {event.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2">

                    <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">

                      <UserCheck
                        size={15}
                        className="text-cyan-400"
                      />

                    </div>

                    <span className="text-sm text-zinc-300">
                      {event.user}
                    </span>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default TicketTimeline;