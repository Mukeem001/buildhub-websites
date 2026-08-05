import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import type { DeviceType } from "@/types/preview";

import {
  PreviewHeader,
  DeviceSwitcher,
  PreviewFrame,
  TemplateInfo,
  RelatedTemplates,
  StickyActionBar,
} from "@/components/template-preview";

import PublishWebsiteModal from "@/components/publish/PublishWebsiteModal";

import { fetchTemplates } from "@/services/template.service";

const TemplatePreview = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [device, setDevice] =
    useState<DeviceType>("desktop");

  const [showModal, setShowModal] =
    useState(false);

  const [template, setTemplate] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchTemplates();
        const found = data.find((t: any) => t.slug === slug);
        setTemplate(found || null);
      } catch (err) {
        setTemplate(null);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [slug]);

  useEffect(() => {
    if (searchParams.get("mode") === "use") {
      setShowModal(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setShowModal(false);
    setSearchParams((prev) => {
      prev.delete("mode");
      return prev;
    });
  };

  // 🔥 IMPORTANT CRASH FIX
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading template...
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Template Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-20">

      <PreviewHeader
        title={template.title}
        category={template.category}
        premium={template.premium}
        rating={template.rating}
        downloads={template.downloads}
        onUseTemplate={() => setShowModal(true)}
      />

      <DeviceSwitcher
        device={device}
        setDevice={setDevice}
        previewUrl={template.previewUrl}
      />

      <PreviewFrame
        device={device}
        previewUrl={template.previewUrl}
      />

      <TemplateInfo
        title={template.title}
        description={template.description}
        rating={template.rating}
        downloads={template.downloads}
        version="1.0.0"
        author="BuildHub"
        updatedAt="Just now"
        technologies={[]}
        pages={[]}
        colors={[]}
        features={[]}
      />

      <RelatedTemplates />

      <StickyActionBar
        title={template.title}
        price={template.price}
        premium={template.premium}
        rating={template.rating}
        onPreview={() =>
          window.open(template.previewUrl)
        }
        onUseTemplate={() =>
          setShowModal(true)
        }
        onWishlist={() =>
          console.log("Wishlist")
        }
      />

      <PublishWebsiteModal
        isOpen={showModal}
        onClose={handleClose}
        templateId={template.slug}
        templateName={template.title}
      />

    </main>
  );
};

export default TemplatePreview;