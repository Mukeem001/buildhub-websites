import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TemplateCard from "./TemplateCard";
import PublishWebsiteModal from "../../../../components/publish/PublishWebsiteModal";
import LoginPromptModal from "../../../../components/auth/LoginPromptModal";
import { useAuth } from "@/context/AuthContext";
import { fetchTemplates } from "../../../../services/template.service";

interface Props {
  search: string;
  selectedCategory: string;
}

const TemplateGrid = ({ search, selectedCategory }: Props) => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<any>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates();
        setTemplates(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadTemplates();
  }, []);

  const filteredTemplates = templates.filter((t) => {
    return (
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "All" ||
        t.category === selectedCategory)
    );
  });

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-5">

        {loading ? (
          <div className="text-center text-white">Loading templates...</div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-white text-center">
            No Templates Found
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                {...template}
                onFavorite={() =>
                  console.log("Fav:", template.id)
                }

                onPreview={() =>
                  navigate(`/templates/${template.slug}`)
                }

                onUse={() => {
                  setSelectedTemplate(template);
                  if (!user) {
                    setShowLoginPrompt(true);
                    return;
                  }

                  setShowModal(true);
                }}
              />
            ))}

          </div>
        )}

        {/* Publish modal */}
        {selectedTemplate && (
          <PublishWebsiteModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setSelectedTemplate(null);
            }}
            templateId={selectedTemplate.slug}
            templateName={selectedTemplate.title}
          />
        )}

        <LoginPromptModal
          isOpen={showLoginPrompt}
          onClose={() => {
            setShowLoginPrompt(false);
            setSelectedTemplate(null);
          }}
        />
      </div>
    </section>
  );
};

export default TemplateGrid;