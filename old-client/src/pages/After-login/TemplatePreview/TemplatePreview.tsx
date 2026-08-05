import { useState } from "react";
import { useParams } from "react-router-dom";

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

import { templates } from "@/data/templates";

const TemplatePreview = () => {
  const { slug } = useParams();

  const [device, setDevice] =
    useState<DeviceType>("desktop");

  const [showModal, setShowModal] =
    useState(false);

  const template = templates.find(
    (t) => t.slug === slug
  );

  // 🔥 IMPORTANT CRASH FIX
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
        onClose={() => setShowModal(false)}
        templateId={template.slug}
        templateName={template.title}
      />

    </main>
  );
};

export default TemplatePreview;