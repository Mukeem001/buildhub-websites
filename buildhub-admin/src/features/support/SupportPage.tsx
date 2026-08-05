import { useMemo, useState } from "react";

import SupportHeader from "./components/SupportHeader";
import SupportStats from "./components/SupportStats";
import SupportTable from "./components/SupportTable";
import BulkActionsBar from "./components/BulkActionsBar";
import TicketDrawer from "./components/TicketDrawer";
import TicketReplies, {
  Reply,
} from "./components/TicketReplies";
import TicketTimeline, {
  TimelineEvent,
} from "./components/TicketTimeline";
import CreateTicketModal from "./components/CreateTicketModal";
import DeleteTicketDialog from "./components/DeleteTicketDialog";

import {
  tickets as initialTickets,
} from "./data/tickets";

import { Ticket } from "./types/ticket";

import {
  exportSupportCSV,
  deleteSelectedTickets,
  resolveSelectedTickets,
  closeSelectedTickets,
  assignSelectedTickets,
  createTicket,
  deleteTicket,
} from "@/utils/supportActions";

/* ------------------------------------------------ */

const SupportPage = () => {

  /* ===========================
      States
  =========================== */

  const [tickets, setTickets] =
    useState<Ticket[]>(initialTickets);

  const [selectedIds, setSelectedIds] =
    useState<number[]>([]);

  const [selectedTicket, setSelectedTicket] =
    useState<Ticket | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [createOpen, setCreateOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  /* Filters */

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [category, setCategory] = useState("");

  const [priority, setPriority] = useState("");

  /* Replies */

  const [replies, setReplies] = useState<Reply[]>([
    {
      id: 1,
      sender: "Customer",
      name: "John Smith",
      message:
        "Hi, I cannot publish my website. Please help.",
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      sender: "Agent",
      name: "Sarah",
      message:
        "Sure! Could you please share the error screenshot?",
      createdAt: "1 hour ago",
    },
  ]);

  /* Timeline */

  const [timeline] = useState<TimelineEvent[]>([
    {
      id: 1,
      type: "created",
      title: "Ticket Created",
      description:
        "Customer created a support request.",
      createdAt: "Today 09:20",
      user: "John Smith",
    },
    {
      id: 2,
      type: "assigned",
      title: "Assigned to Sarah",
      description:
        "Support manager assigned this ticket.",
      createdAt: "Today 09:40",
      user: "Admin",
    },
    {
      id: 3,
      type: "reply",
      title: "Agent Replied",
      description:
        "Requested additional information.",
      createdAt: "Today 10:00",
      user: "Sarah",
    },
  ]);

  /* ===========================
      Filters
  =========================== */

  const filteredTickets = useMemo(() => {

    return tickets.filter((ticket) => {

      const searchMatch =
        ticket.subject
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        ticket.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        ticket.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        !status || ticket.status === status;

      const categoryMatch =
        !category ||
        ticket.category === category;

      const priorityMatch =
        !priority ||
        ticket.priority === priority;

      return (
        searchMatch &&
        statusMatch &&
        categoryMatch &&
        priorityMatch
      );
    });

  }, [
    tickets,
    search,
    status,
    category,
    priority,
  ]);

  /* ===========================
      CRUD
  =========================== */

  const handleCreateTicket = (
    data: Parameters<typeof createTicket>[1]
  ) => {
    setTickets((prev) =>
      createTicket(prev, data)
    );
  };

  const handleDeleteTicket = () => {

    if (!selectedTicket) return;

    setTickets((prev) =>
      deleteTicket(prev, selectedTicket.id)
    );

    setDeleteOpen(false);

    setSelectedTicket(null);

  };

  const handleReply = (message: string) => {

    const reply: Reply = {

      id: Date.now(),

      sender: "Agent",

      name: "Support Team",

      message,

      createdAt: "Just now",

    };

    setReplies((prev) => [...prev, reply]);

  };

  /* ===========================
      Bulk Actions
  =========================== */

  const handleBulkDelete = () => {

    setTickets((prev) =>
      deleteSelectedTickets(
        prev,
        selectedIds
      )
    );

    setSelectedIds([]);

  };

  const handleBulkResolve = () => {

    setTickets((prev) =>
      resolveSelectedTickets(
        prev,
        selectedIds
      )
    );

    setSelectedIds([]);

  };

  const handleBulkClose = () => {

    setTickets((prev) =>
      closeSelectedTickets(
        prev,
        selectedIds
      )
    );

    setSelectedIds([]);

  };

  const handleBulkAssign = () => {

    setTickets((prev) =>
      assignSelectedTickets(
        prev,
        selectedIds,
        "Sarah"
      )
    );

    setSelectedIds([]);

  };

  const handleExport = () => {

    exportSupportCSV(filteredTickets);

  };


    /* ===========================
      JSX
  =========================== */

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <SupportHeader
        search={search}
        status={status}
        category={category}
        priority={priority}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onCategoryChange={setCategory}
        onPriorityChange={setPriority}
        onRefresh={() => window.location.reload()}
        onExport={handleExport}
        onCreateTicket={() => setCreateOpen(true)}
      />

      {/* Stats */}

      <SupportStats />

      {/* Filters */}

      <div className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:grid-cols-3 lg:grid-cols-4">

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
        >
          <option value="">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
          <option value="Website">Website</option>
          <option value="Domain">Domain</option>
          <option value="Templates">Templates</option>
          <option value="Bug">Bug</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
        >
          <option value="">All Priority</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          onClick={() => {
            setStatus("");
            setCategory("");
            setPriority("");
            setSearch("");
          }}
          className="rounded-xl border border-zinc-700 px-4 py-3 text-white transition hover:bg-zinc-800"
        >
          Reset Filters
        </button>

      </div>

      {/* Bulk Actions */}

      <BulkActionsBar
        selectedCount={selectedIds.length}
        onDelete={handleBulkDelete}
        onResolve={handleBulkResolve}
        onCloseTickets={handleBulkClose}
        onAssign={handleBulkAssign}
        onExport={handleExport}
        onClear={() => setSelectedIds([])}
      />

      {/* Support Table */}

      <SupportTable
        tickets={filteredTickets}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onView={(ticket) => {
          setSelectedTicket(ticket);
          setDrawerOpen(true);
        }}
        onEdit={(ticket) => {
          setSelectedTicket(ticket);
          setDrawerOpen(true);
        }}
        onReply={(ticket) => {
          setSelectedTicket(ticket);
          setDrawerOpen(true);
        }}
        onDelete={(ticket) => {
          setSelectedTicket(ticket);
          setDeleteOpen(true);
        }}
      />



            {/* Ticket Details Drawer */}

      <TicketDrawer
        open={drawerOpen}
        ticket={selectedTicket}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTicket(null);
        }}
        onReply={() => {
          // Reply section drawer ke neeche available hai
        }}
        onEdit={() => {
          // Future Edit Modal
        }}
      />

      {/* Right Side Panel */}

      {selectedTicket && (
        <div className="grid gap-6 xl:grid-cols-2">

          {/* Replies */}

          <TicketReplies
            replies={replies}
            onSend={handleReply}
          />

          {/* Timeline */}

          <TicketTimeline
            events={timeline}
          />

        </div>
      )}

      {/* Empty State */}

      {!selectedTicket && (
        <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 py-16 text-center">

          <h3 className="text-xl font-semibold text-white">
            No Ticket Selected
          </h3>

          <p className="mt-3 text-zinc-400">
            Select any ticket from the table to view its
            complete details, conversation history, and
            activity timeline.
          </p>

        </div>
      )}


            {/* Create Ticket Modal */}

      <CreateTicketModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateTicket}
      />

      {/* Delete Ticket Dialog */}

      <DeleteTicketDialog
        open={deleteOpen}
        ticket={selectedTicket}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedTicket(null);
        }}
        onConfirm={() => {
          handleDeleteTicket();
        }}
      />

    </div>
  );
};

export default SupportPage;