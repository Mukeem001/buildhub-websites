import { getCurrentUser, invalidateSession } from "./auth.service";
import { API_URL } from "./api.config";

const mapTemplateSlugForBackend = (templateId: any) => {
  const value = String(templateId ?? "").trim().toLowerCase();

  const aliases: Record<string, string> = {
    "1": "ecommerce",
    "2": "restaurant",
    "3": "portfolio",
    "4": "hospital",
    "5": "school",
    "6": "gym",
    "7": "business",
    "8": "blog",
    "modern-ecommerce": "ecommerce",
    "restaurant-pro": "restaurant",
    "business": "business",
    "portfolio-x": "portfolio",
    "hospital": "hospital",
    "school": "school",
    "gym": "gym",
    "blog": "blog",
    "agency": "business",
  };

  return aliases[value] || value;
};

export const createWebsite = async (data: any) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error(
      "Please log in before creating your website."
    );
  }

  const payloadBody = {
    userId: user.id,
    templateSlug: mapTemplateSlugForBackend(
      data.templateId
    ),
    name: data.websiteName,
    subdomain: data.subdomain,
    customDomain: data.customDomain,
    domainType: data.domainType,
  };

  console.log("Create website request payload", payloadBody);

  const response = await fetch(
    `${API_URL}/websites/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token || ""}`,
      },
      body: JSON.stringify(payloadBody),
    }
  );

  const payload = await response.json().catch(() => null);

  console.log("Create website response", {
    status: response.status,
    payload,
  });

  if (!response.ok) {
    if (response.status === 403) {
      invalidateSession(payload?.message || "Session expired");
    }

    throw new Error(
      payload?.message ||
        "Failed to create website"
    );
  }

  const website = payload?.data;

  if (website?.moduleRoutes?.adminBase) {
    return {
      ...website,
      moduleRoutes: website.moduleRoutes,
      moduleBasePath: website.moduleBasePath,
    };
  }

  return website;
};

export const publishWebsite = async (data: any) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error(
      "Please log in before publishing your website."
    );
  }

  let website: any = undefined;

  if (!data.websiteId) {
    website = await createWebsite(data);
  }

  const websiteId = data.websiteId || website?._id;

  if (!websiteId) {
    throw new Error(
      "Website ID is required for publishing."
    );
  }

  const publishResponse = await fetch(
    `${API_URL}/publish/${websiteId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token || ""}`,
      },
    }
  );

  const publishPayload = await publishResponse
    .json()
    .catch(() => null);

  if (!publishResponse.ok) {
    if (publishResponse.status === 403) {
      invalidateSession(publishPayload?.message || "Session expired");
    }

    throw new Error(
      publishPayload?.message ||
        "Failed to publish website"
    );
  }

  return {
    success: true,
    website: publishPayload?.data || { _id: websiteId },
    publish: publishPayload,
    message:
      publishPayload?.message ||
      "Website published successfully",
  };
};


export const verifyDomain = async (
  websiteId: string
) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error(
      "Please log in before verifying a domain."
    );
  }

  const response = await fetch(
    `${API_URL}/domain/verify/${websiteId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token || ""}`,
      },
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 403) {
      invalidateSession(payload?.message || "Session expired");
    }

    throw new Error(
      payload?.message ||
        "Failed to verify domain"
    );
  }

  return payload?.data;
};

export const getWebsiteDomain = async (websiteId: string) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error("Please log in before fetching domain details.");
  }

  const response = await fetch(
    `${API_URL}/domain/${websiteId}`,
    {
      headers: {
        Authorization: `Bearer ${user.token || ""}`,
      },
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 403) {
      invalidateSession(payload?.message || "Session expired");
    }

    throw new Error(
      payload?.message ||
        "Failed to fetch domain details"
    );
  }

  return payload?.data;
};

export const deleteDomain = async (websiteId: string) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error("Please log in before deleting a domain.");
  }

  const response = await fetch(
    `${API_URL}/domain/${websiteId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token || ""}`,
      },
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 403) {
      invalidateSession(payload?.message || "Session expired");
    }

    if (response.status === 404) {
      throw new Error(payload?.message || "No connected domain found for this website.");
    }

    throw new Error(
      payload?.message ||
        "Failed to delete domain"
    );
  }

  return payload?.data;
};

export const connectDomain = async (data: any) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error(
      "Please log in before connecting a domain."
    );
  }

  const response = await fetch(
    `${API_URL}/domain/connect`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token || ""}`,
      },
      body: JSON.stringify({
        websiteId: data.websiteId,
        domain: data.customDomain,
        cnameHost: data.dnsHost,
        cnameTarget: data.dnsTarget,
      }),
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 403) {
      invalidateSession(payload?.message || "Session expired");
    }

    throw new Error(
      payload?.message ||
        "Failed to connect custom domain"
    );
  }

  return payload?.data;
};