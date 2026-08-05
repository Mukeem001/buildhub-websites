import { Domain } from "@/features/domains/types/domain";

/**
 * Delete selected domains
 */
export const deleteSelectedDomains = (
  domains: Domain[],
  selectedIds: Array<string | number>
): Domain[] => {
  return domains.filter(
    (domain) => !selectedIds.includes(domain.id)
  );
};

/**
 * Connect selected pending/expired domains
 */
export const connectSelectedDomains = (
  domains: Domain[],
  selectedIds: Array<string | number>
): Domain[] => {
  return domains.map((domain) => {
    if (!selectedIds.includes(domain.id)) {
      return domain;
    }

    return {
      ...domain,
      status: "Connected",
      ssl: "Active",
    };
  });
};