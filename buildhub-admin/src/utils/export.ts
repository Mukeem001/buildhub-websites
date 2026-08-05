export interface Website {
  id: string | number;
  name: string;
  domain: string;
  owner: string;
  template: string;
  status: string;
  plan: string;
  visitors: number;
  storage: string;
  createdAt: string;
}

// ==========================
// Export Websites CSV
// ==========================

export const exportWebsitesCSV = (
  websites: Website[]
) => {
  if (!websites.length) return;

  const headers = [
    "ID",
    "Name",
    "Domain",
    "Owner",
    "Template",
    "Status",
    "Plan",
    "Visitors",
    "Storage",
    "Created At",
  ];

  const rows = websites.map((site) => [
    site.id,
    site.name,
    site.domain,
    site.owner,
    site.template,
    site.status,
    site.plan,
    site.visitors,
    site.storage,
    site.createdAt,
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
  link.download = `websites-${Date.now()}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

// ==========================
// Export Orders CSV
// ==========================

export const exportOrdersCSV = (
  orders: any[]
) => {
  if (!orders.length) return;

  const headers = Object.keys(orders[0]);

  const rows = orders.map((order) =>
    headers.map((header) => order[header])
  );

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
  link.download = `orders-${Date.now()}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};




import { Payment } from "@/features/payments/types/payment";

export const exportPaymentsCSV = (
  payments: Payment[]
) => {
  if (!payments.length) return;

  const headers = [
    "ID",
    "Customer",
    "Email",
    "Order ID",
    "Transaction ID",
    "Amount",
    "Method",
    "Status",
    "Created At",
  ];

  const rows = payments.map((payment) => [
    payment.id,
    payment.customer,
    payment.email,
    payment.orderId,
    payment.transactionId,
    payment.amount,
    payment.method,
    payment.status,
    payment.createdAt,
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
  link.download = `payments-${Date.now()}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};




import { Domain } from "@/features/domains/types/domain";

export const exportDomainsCSV = (
  domains: Domain[]
) => {
  if (!domains.length) return;

  const headers = [
    "ID",
    "Domain",
    "Website",
    "Owner",
    "Registrar",
    "SSL",
    "Status",
    "Expiry Date",
    "Created At",
  ];

  const rows = domains.map((domain) => [
    domain.id,
    domain.domain,
    domain.website,
    domain.owner,
    domain.registrar,
    domain.ssl,
    domain.status,
    domain.expiryDate,
    domain.createdAt,
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
  link.download = `domains-${Date.now()}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};




import { Media } from "@/features/media/types/media";

export const exportMediaCSV = (
  media: Media[]
) => {
  if (!media.length) return;

  const headers = [
    "ID",
    "Name",
    "Type",
    "Status",
    "Size",
    "Folder",
    "Uploaded By",
    "Uploaded At",
    "URL",
  ];

  const rows = media.map((item) => [
    item.id,
    item.name,
    item.type,
    item.status,
    item.size,
    item.folder,
    item.uploadedBy,
    item.uploadedAt,
    item.url,
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
  link.download = `media-${Date.now()}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};



export const exportAnalyticsCSV = () => {
  const headers = [
    "Metric",
    "Value",
  ];

  const rows = [
    ["Revenue", "$248,950"],
    ["Users", "12,480"],
    ["Websites", "3,560"],
    ["Orders", "924"],
    ["Conversion", "6.4%"],
    ["Bounce Rate", "28.1%"],
  ];

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
  link.download = `analytics-${Date.now()}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};