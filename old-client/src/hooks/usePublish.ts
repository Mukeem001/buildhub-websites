import { useEffect, useState } from "react";

import {
  connectDomain,
  createWebsite,
  publishWebsite,
  verifyDomain,
} from "../services/publish.service";

const API_ORIGIN = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
  : "http://localhost:5000";

const DEFAULT_CUSTOM_DOMAIN_TARGET =
  import.meta.env.VITE_CUSTOM_DOMAIN_TARGET ||
  API_ORIGIN.replace(/^https?:\/\//, "");
import type {
  DomainType,
  PublishStep,
  PublishFormData,
} from "../types/publish";

export const usePublish = (
  templateId: number | string,
  templateName: string
) => {
  const [step, setStep] =
    useState<PublishStep>("details");

  const [loading, setLoading] =
    useState(false);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [websiteUrl, setWebsiteUrl] =
    useState("");

  const [adminUrl, setAdminUrl] =
    useState("");

  // ================= Form =================

  const [websiteName, setWebsiteName] =
    useState("");

  const [domainType, setDomainType] =
    useState<DomainType>("subdomain");

  const [customDomain, setCustomDomain] =
    useState("");

  const [customDomainConnected, setCustomDomainConnected] =
    useState(false);

  const [customDomainVerified, setCustomDomainVerified] =
    useState(false);

  const [verificationReason, setVerificationReason] =
    useState("");

  const [websiteId, setWebsiteId] =
    useState<string | undefined>(undefined);

  const [dnsHost, setDnsHost] =
    useState("www");

  const [dnsTarget, setDnsTarget] =
    useState(DEFAULT_CUSTOM_DOMAIN_TARGET);

  const [
    createAdminPanel,
    setCreateAdminPanel,
  ] = useState(true);

  const [enableSSL, setEnableSSL] =
    useState(true);

  useEffect(() => {
    if (domainType === "subdomain") {
      setCustomDomainConnected(false);
      setCustomDomainVerified(false);
      setVerificationReason("");
      setWebsiteId(undefined);
    }
  }, [domainType]);

  useEffect(() => {
    if (domainType === "custom") {
      setCustomDomainConnected(false);
      setCustomDomainVerified(false);
      setVerificationReason("");
      setWebsiteId(undefined);
    }
  }, [customDomain, domainType]);

  // ================= Reset =================

  const reset = () => {
    setStep("details");
    setLoading(false);
    setCurrentStep(0);
    setWebsiteName("");
    setDomainType("subdomain");
    setCustomDomain("");
    setCustomDomainConnected(false);
    setWebsiteId(undefined);
    setDnsHost("www");
    setDnsTarget(DEFAULT_CUSTOM_DOMAIN_TARGET);
    setCreateAdminPanel(true);
    setEnableSSL(true);
    setWebsiteUrl("");
    setAdminUrl("");
  };

  // ================= Publish =================

  const publish = async () => {
    if (
      domainType === "custom" &&
      !customDomainVerified
    ) {
      alert(
        "Please verify your custom domain DNS before publishing."
      );
      return;
    }

    const payload: PublishFormData = {
      websiteName,
      subdomain: websiteName,
      customDomain,
      domainType,
      websiteId,
      createAdminPanel,
      enableSSL,
      enableSEO: true,
      enableAnalytics: false,
      enableBlog: false,
      templateId,
      templateName,
    };

    setLoading(true);
    setStep("publishing");

    try {
      const steps = [
        "Preparing your website",
        "Creating project files",
        "Connecting your domain",
        "Finalizing publish settings",
      ];

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise((resolve) =>
          setTimeout(resolve, 700)
        );
      }

      console.log("Publish payload", payload);
      const result = await publishWebsite(payload);
      console.log("Publish result", result);
      const publishedWebsite: any = result.website;
      const moduleAdminBase = publishedWebsite?.moduleRoutes?.adminBase || "";
      const moduleUserBase = publishedWebsite?.moduleRoutes?.userBase || "";

      const apiOrigin =
        import.meta.env.VITE_API_URL
          ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
          : "http://localhost:5000";

      const isDevelopment =
        window.location.hostname === "localhost";

      const website =
        isDevelopment
          ? `http://localhost:5000/sites/${publishedWebsite.slug}`
          : domainType === "custom"
          ? `https://${customDomain}`
          : `${apiOrigin}/sites/${publishedWebsite.slug}`;

      const admin = moduleAdminBase
        ? `${window.location.origin}${moduleAdminBase}`
        : isDevelopment
        ? `http://localhost:5173/dashboard/${result.website._id}`
        : `https://${window.location.hostname}/dashboard/${result.website._id}`;

      setWebsiteUrl(moduleUserBase ? `${window.location.origin}${moduleUserBase}` : website);
      setAdminUrl(admin);
      console.log("Publish success URLs", {
        websiteUrl: moduleUserBase ? `${window.location.origin}${moduleUserBase}` : website,
        adminUrl: admin,
        publishedWebsite,
      });

      setLoading(false);
      setStep("success");
    } catch (error: any) {
      setLoading(false);
      setStep("details");

      alert(
        error.message ||
          "Unable to publish your website right now."
      );
    }
  };

  const connectCustomDomain = async () => {
    if (
      domainType !== "custom" ||
      !customDomain ||
      websiteName.trim().length < 3
    ) {
      return;
    }

    setLoading(true);

    try {
      let currentWebsiteId = websiteId;

      if (!currentWebsiteId) {
        const website = await createWebsite({
          websiteName,
          subdomain: websiteName,
          customDomain,
          domainType,
          createAdminPanel,
          enableSSL,
          enableSEO: true,
          enableAnalytics: false,
          enableBlog: false,
          templateId,
          templateName,
        });

        currentWebsiteId = website?._id;
        setWebsiteId(currentWebsiteId);
      }

      if (!currentWebsiteId) {
        throw new Error(
          "Unable to create website before connecting domain."
        );
      }

      await connectDomain({
        websiteId: currentWebsiteId,
        customDomain,
        dnsHost,
        dnsTarget: dnsTarget || DEFAULT_CUSTOM_DOMAIN_TARGET,
      });

      setCustomDomainConnected(true);
      setCustomDomainVerified(false);
      setVerificationReason("");
      window.alert("Domain connected successfully.");
    } catch (error: any) {
      alert(
        error.message ||
          "Unable to connect your custom domain."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyCustomDomain = async () => {
    if (!websiteId) {
      alert(
        "Please connect your domain before verifying."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await verifyDomain(
        websiteId
      );

      const verified =
        result?.verificationStatus ===
          "verified" ||
        result?.verified;

      setCustomDomainVerified(verified);
      setVerificationReason(result?.reason || "");

      if (verified) {
        window.alert(
          "Domain DNS verified successfully. Your custom domain is ready."
        );
      } else {
        window.alert(
          `DNS verification failed. ${
            result?.reason || "Please update your DNS records and try again."
          }`
        );
      }
    } catch (error: any) {
      alert(
        error.message ||
          "Unable to verify your custom domain."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    // state
    step,
    loading,
    currentStep,
    websiteUrl,
    adminUrl,
    websiteName,
    domainType,
    customDomain,
    dnsHost,
    dnsTarget,
    customDomainConnected,
    customDomainVerified,
    verificationReason,
    createAdminPanel,
    enableSSL,

    // setters
    setWebsiteName,
    setDomainType,
    setCustomDomain,
    setDnsHost,
    setDnsTarget,
    setCreateAdminPanel,
    setEnableSSL,

    // actions
    publish,
    reset,
    connectCustomDomain,
    verifyCustomDomain,
  };
};