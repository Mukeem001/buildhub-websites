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

/* ---------------- Delete ---------------- */

export const deleteSelectedWebsites = (
  selectedIds: Array<string | number>,
  websites: Website[]
): Website[] => {
  return websites.filter(
    (website) => !selectedIds.includes(website.id)
  );
};

/* ---------------- Publish ---------------- */

export const publishSelectedWebsites = (
  selectedIds: Array<string | number>,
  websites: Website[]
): Website[] => {
  return websites.map((website) =>
    selectedIds.includes(website.id)
      ? {
          ...website,
          status: "Published",
        }
      : website
  );
};