import { Ticket } from "@/features/support/types/ticket";

/* ===========================
   Export CSV
=========================== */

export const exportSupportCSV = (tickets: Ticket[]) => {
  const headers = [
    "ID",
    "Subject",
    "Customer",
    "Email",
    "Category",
    "Priority",
    "Status",
    "Assigned To",
    "Created At",
    "Updated At",
  ];

  const rows = tickets.map((ticket) => [
    ticket.id,
    ticket.subject,
    ticket.customer,
    ticket.email,
    ticket.category,
    ticket.priority,
    ticket.status,
    ticket.assignedTo,
    ticket.createdAt,
    ticket.updatedAt,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `support-tickets-${Date.now()}.csv`;

  link.click();

  URL.revokeObjectURL(url);
};

/* ===========================
   Delete Selected
=========================== */

export const deleteSelectedTickets = (
  tickets: Ticket[],
  ids: number[]
): Ticket[] => {
  return tickets.filter(
    (ticket) => !ids.includes(ticket.id)
  );
};

/* ===========================
   Resolve Selected
=========================== */

export const resolveSelectedTickets = (
  tickets: Ticket[],
  ids: number[]
): Ticket[] => {
  return tickets.map((ticket) =>
    ids.includes(ticket.id)
      ? {
          ...ticket,
          status: "Resolved",
        }
      : ticket
  );
};

/* ===========================
   Close Selected
=========================== */

export const closeSelectedTickets = (
  tickets: Ticket[],
  ids: number[]
): Ticket[] => {
  return tickets.map((ticket) =>
    ids.includes(ticket.id)
      ? {
          ...ticket,
          status: "Closed",
        }
      : ticket
  );
};

/* ===========================
   Assign Selected
=========================== */

export const assignSelectedTickets = (
  tickets: Ticket[],
  ids: number[],
  agent: string
): Ticket[] => {
  return tickets.map((ticket) =>
    ids.includes(ticket.id)
      ? {
          ...ticket,
          assignedTo: agent,
        }
      : ticket
  );
};

/* ===========================
   Create Ticket
=========================== */

interface CreateTicketInput {
  subject: string;
  customer: string;
  email: string;
  category: Ticket["category"];
  priority: Ticket["priority"];
  assignedTo: string;
  message: string;
}

export const createTicket = (
  tickets: Ticket[],
  input: CreateTicketInput
): Ticket[] => {
  const newTicket: Ticket = {
    id: Date.now(),

    subject: input.subject,

    customer: input.customer,

    email: input.email,

    category: input.category,

    priority: input.priority,

    status: "Open",

    assignedTo: input.assignedTo,

    createdAt: new Date().toISOString().split("T")[0],

    updatedAt: new Date().toISOString().split("T")[0],

    message: input.message,
  };

  return [newTicket, ...tickets];
};

/* ===========================
   Update Ticket
=========================== */

export const updateTicket = (
  tickets: Ticket[],
  updatedTicket: Ticket
): Ticket[] => {
  return tickets.map((ticket) =>
    ticket.id === updatedTicket.id
      ? {
          ...updatedTicket,
          updatedAt: new Date()
            .toISOString()
            .split("T")[0],
        }
      : ticket
  );
};

/* ===========================
   Delete Single Ticket
=========================== */

export const deleteTicket = (
  tickets: Ticket[],
  id: number
): Ticket[] => {
  return tickets.filter(
    (ticket) => ticket.id !== id
  );
};

/* ===========================
   Search Tickets
=========================== */

export const searchTickets = (
  tickets: Ticket[],
  keyword: string
): Ticket[] => {
  const value = keyword.toLowerCase();

  return tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(value) ||
      ticket.customer.toLowerCase().includes(value) ||
      ticket.email.toLowerCase().includes(value) ||
      ticket.category.toLowerCase().includes(value)
  );
};

/* ===========================
   Filter Tickets
=========================== */

interface FilterOptions {
  status?: string;
  category?: string;
  priority?: string;
}

export const filterTickets = (
  tickets: Ticket[],
  filters: FilterOptions
): Ticket[] => {
  return tickets.filter((ticket) => {
    const statusMatch =
      !filters.status ||
      ticket.status === filters.status;

    const categoryMatch =
      !filters.category ||
      ticket.category === filters.category;

    const priorityMatch =
      !filters.priority ||
      ticket.priority === filters.priority;

    return (
      statusMatch &&
      categoryMatch &&
      priorityMatch
    );
  });
};