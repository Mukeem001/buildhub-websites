import React, { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Copy,
  Edit3,
  GripVertical,
  LayoutTemplate,
  Monitor,
  MousePointer2,
  Plus,
  Save,
  Smartphone,
  Tablet,
} from "lucide-react";
import { fetchProjects, fetchWebsiteEditor, publishWebsite, saveWebsiteEditorDraft } from "../../../services/project.service";
import type { Project } from "../../../types/project";

type DeviceType = "mobile" | "tablet" | "laptop";
type PageTemplate = string;

type BlockStyle = {
  width: string;
  height: string;
  minHeight: string;
  backgroundColor: string;
  textColor: string;
  padding: string;
  borderRadius: string;
  margin: string;
  border: string;
  display: string;
  flexDirection: string;
  justifyContent: string;
  alignItems: string;
  gap: string;
  position: string;
  left: string;
  top: string;
  zIndex: string;
  opacity: string;
  boxShadow: string;
};

type EditorBlock = {
  id: string;
  type: "hero" | "features" | "cta" | "testimonial" | "stats" | "text" | "container";
  title: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  isContainer?: boolean;
  children?: EditorBlock[];
  style?: Partial<BlockStyle>;
};

type HorizontalAlign = "left" | "center" | "right";
type VerticalAlign = "top" | "middle" | "bottom";
type NavbarConfig = {
  brand: string;
  links: string[];
  cta: string;
  backgroundColor: string;
  textColor: string;
  padding: string;
  horizontalAlign: HorizontalAlign;
  verticalAlign: VerticalAlign;
  logoUrl?: string;
  logoX?: number;
  logoY?: number;
};

type FooterConfig = {
  copyright: string;
  links: string[];
  backgroundColor: string;
  textColor: string;
  padding: string;
  horizontalAlign: HorizontalAlign;
  verticalAlign: VerticalAlign;
  logoUrl?: string;
  logoX?: number;
  logoY?: number;
};

type EditorPage = {
  id: PageTemplate;
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  blocks: EditorBlock[];
  navbar?: NavbarConfig;
  footer?: FooterConfig;
};

const mockPages: EditorPage[] = [
  {
    id: "home",
    name: "Home",
    slug: "home",
    seoTitle: "BuildHub | Launch your next website",
    seoDescription: "Professional websites for businesses and creators.",
    blocks: [
      {
        id: "hero-home",
        type: "hero",
        title: "Build beautiful websites that convert",
        subtitle: "Launch faster with design, marketing and SEO built in.",
        description: "Turn your ideas into a polished digital presence with modern templates and conversion-focused content.",
        buttonLabel: "Get Started",
      },
      {
        id: "stats-home",
        type: "stats",
        title: "Business growth in numbers",
        subtitle: "Trusted by growing brands online.",
        description: "5k+ launches, 4.9/5 average rating and 140% faster setup.",
      },
      {
        id: "feature-home",
        type: "features",
        title: "Everything you need in one place",
        subtitle: "Design, publish and manage from a single dashboard.",
        buttonLabel: "Explore Features",
      },
    ],
  },
  {
    id: "about",
    name: "About",
    slug: "about",
    seoTitle: "About BuildHub",
    seoDescription: "Learn more about our mission and why modern businesses choose BuildHub.",
    blocks: [
      {
        id: "hero-about",
        type: "hero",
        title: "We build digital experiences that feel premium",
        subtitle: "For entrepreneurs, agencies and growing businesses.",
        description: "We help teams launch websites that are faster, cleaner and easier to manage.",
        buttonLabel: "Meet the team",
      },
      {
        id: "text-about",
        type: "text",
        title: "Our story",
        description: "From a simple idea to a full website platform designed for speed, clarity and performance.",
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    slug: "pricing",
    seoTitle: "Pricing plans",
    seoDescription: "Choose a plan that matches your website goals.",
    blocks: [
      {
        id: "cta-pricing",
        type: "cta",
        title: "Simple pricing. Powerful features.",
        subtitle: "Choose the plan that fits your next launch.",
        buttonLabel: "View plans",
      },
    ],
  },
  {
    id: "contact",
    name: "Contact",
    slug: "contact",
    seoTitle: "Contact us",
    seoDescription: "Get in touch for support or a custom web project.",
    blocks: [
      {
        id: "hero-contact",
        type: "hero",
        title: "Let’s build something great together",
        subtitle: "Need help with a launch, redesign or strategy call?",
        description: "Tell us what you are building and our team will guide you to the right solution.",
        buttonLabel: "Book a call",
      },
    ],
  },
  {
    id: "features",
    name: "Features",
    slug: "features",
    seoTitle: "Features",
    seoDescription: "Explore the platform features built for speed and growth.",
    blocks: [
      {
        id: "feature-features",
        type: "features",
        title: "A website platform built for growth",
        subtitle: "Everything from landing pages to business websites in one place.",
        description: "Create pages, customize content and publish faster without a developer.",
        buttonLabel: "See demo",
      },
      {
        id: "testimonial-features",
        type: "testimonial",
        title: "Teams love the speed",
        subtitle: "“The editor feels like using a modern design tool.”",
      },
    ],
  },
];

const NAVBAR_BLOCK_ID = "__navbar__";
const FOOTER_BLOCK_ID = "__footer__";

const WebsiteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [pages, setPages] = useState<EditorPage[]>(mockPages);
  const [selectedPageId, setSelectedPageId] = useState<PageTemplate>("home");
  const [selectedBlockId, setSelectedBlockId] = useState<string>("");
  const [device, setDevice] = useState<DeviceType>("laptop");
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [resizeState, setResizeState] = useState<{ id: string; startX: number; startY: number; startWidth: string; startHeight: string } | null>(null);
  const [leftPanelTab, setLeftPanelTab] = useState<"blocks" | "pages" | "settings">("blocks");
  const [previewMode, setPreviewMode] = useState(true);
  const blocksCanvasRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const parseDimensionValue = (value: string, delta: number, mode: "width" | "height") => {
    if (!value || value === "auto") {
      return mode === "width" ? `${Math.max(240, 240 + delta)}px` : `${Math.max(140, 140 + delta)}px`;
    }

    const trimmed = value.trim();
    const numeric = Number.parseFloat(trimmed);

    if (Number.isNaN(numeric)) {
      return mode === "width" ? `${Math.max(240, 240 + delta)}px` : `${Math.max(140, 140 + delta)}px`;
    }

    if (trimmed.endsWith("%")) {
      return `${Math.max(160, numeric + delta / 2)}%`;
    }

    return `${Math.max(120, numeric + delta)}px`;
  };

  const setBlockDimension = (blockId: string, width?: string, height?: string) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;

        return {
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === blockId
              ? {
                  ...block,
                  style: {
                    ...block.style,
                    ...(width !== undefined ? { width } : {}),
                    ...(height !== undefined ? { height } : {}),
                  },
                }
              : block
          ),
        };
      })
    );
  };

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projects = await fetchProjects();
        const match = projects.find((item) => item.id === id);

        if (!match) {
          navigate("/websites");
          return;
        }

        setProject(match);

        const editorData = await fetchWebsiteEditor(match.id);
        const loadedPages: EditorPage[] = editorData.pages.map((page) => ({
          id: page.id,
          name: page.title,
          slug: page.slug,
          seoTitle: page.seo?.title || "",
          seoDescription: page.seo?.description || "",
          blocks: (page.sections || []) as EditorBlock[],
        }));

        if (loadedPages.length > 0) {
          setPages(loadedPages);
          setSelectedPageId(loadedPages[0].id);
        }

        const apiOrigin = import.meta.env.VITE_API_URL
          ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
          : `${window.location.protocol}//${window.location.hostname}:5000`;
        setPreviewUrl(editorData.editor.previewUrl.startsWith("http")
          ? editorData.editor.previewUrl
          : `${apiOrigin}${editorData.editor.previewUrl}`);
      } catch (error) {
        console.error("Failed to load project for editor", error);
        navigate("/websites");
      } finally {
        setLoading(false);
      }
    };

    void loadProject();
  }, [id, navigate]);

  useEffect(() => {
    if (!resizeState) return;

    const handleMouseMove = (event: MouseEvent) => {
      const dx = event.clientX - resizeState.startX;
      const dy = event.clientY - resizeState.startY;

      const nextWidth = parseDimensionValue(resizeState.startWidth, dx, "width");
      const nextHeight = parseDimensionValue(resizeState.startHeight, dy, "height");
      setBlockDimension(resizeState.id, nextWidth, nextHeight);
    };

    const handleMouseUp = () => {
      setResizeState(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizeState, parseDimensionValue, setBlockDimension]);

  const selectedPage = useMemo(
    () => pages.find((page) => page.id === selectedPageId) ?? pages[0],
    [pages, selectedPageId]
  );

  const findBlockById = (blocks: EditorBlock[], blockId: string): EditorBlock | undefined => {
    for (const block of blocks) {
      if (block.id === blockId) return block;
      if (block.children?.length) {
        const nested = findBlockById(block.children, blockId);
        if (nested) return nested;
      }
    }
    return undefined;
  };

  const selectedBlock = useMemo(() => {
    if (selectedBlockId === NAVBAR_BLOCK_ID) {
      return {
        id: NAVBAR_BLOCK_ID,
        type: "text" as const,
        title: "Navbar",
        subtitle: "Edit navigation items and CTA",
      };
    }

    if (selectedBlockId === FOOTER_BLOCK_ID) {
      return {
        id: FOOTER_BLOCK_ID,
        type: "text" as const,
        title: "Footer",
        subtitle: "Edit footer links and copyright",
      };
    }

    if (!selectedBlockId) return undefined;
    return selectedPage ? findBlockById(selectedPage.blocks, selectedBlockId) : undefined;
  }, [selectedBlockId, selectedPage]);

  const isPageSettingsMode = !selectedBlockId || (!findBlockById(selectedPage?.blocks ?? [], selectedBlockId) && selectedBlockId !== NAVBAR_BLOCK_ID && selectedBlockId !== FOOTER_BLOCK_ID);

  const selectBlock = (blockId: string) => {
    setSelectedBlockId(blockId);
    setLeftPanelTab("settings");
  };

  const defaultNavbar: NavbarConfig = {
    brand: "BuildHub",
    links: ["Home", "Features", "Pricing", "Contact"],
    cta: "Get Started",
    backgroundColor: "#0f172a",
    textColor: "#e2e8f0",
    padding: "12px 20px",
    horizontalAlign: "center",
    verticalAlign: "middle",
    logoUrl: "",
    logoX: 0,
    logoY: 0,
  };

  const defaultFooter: FooterConfig = {
    copyright: "© 2026 BuildHub. All rights reserved.",
    links: ["Privacy", "Terms", "Support"],
    backgroundColor: "#020817",
    textColor: "#cbd5e1",
    padding: "16px 20px",
    horizontalAlign: "center",
    verticalAlign: "middle",
    logoUrl: "",
    logoX: 0,
    logoY: 0,
  };

  const deviceWidthMap: Record<DeviceType, string> = {
    mobile: "390px",
    tablet: "768px",
    laptop: "100%",
  };

  const updatePageField = <K extends keyof EditorPage>(field: K, value: EditorPage[K]) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === selectedPageId ? { ...page, [field]: value } : page
      )
    );
    setSaved(false);
  };

  const updateNavbar = (field: "brand" | "cta" | "backgroundColor" | "textColor" | "padding" | "horizontalAlign" | "verticalAlign", value: string) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;
        const nextNavbar = { ...defaultNavbar, ...(page.navbar ?? {}), [field]: value };
        return { ...page, navbar: nextNavbar };
      })
    );
    setSaved(false);
  };

  const updateNavbarLogoPosition = (x: number, y: number) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;
        const nextNavbar = { ...defaultNavbar, ...(page.navbar ?? {}), logoX: x, logoY: y };
        return { ...page, navbar: nextNavbar };
      })
    );
    setSaved(false);
  };

  const updateNavbarLinks = (value: string) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;
        const nextNavbar = { ...defaultNavbar, ...(page.navbar ?? {}), links: value.split(",").map((item) => item.trim()).filter(Boolean) };
        return { ...page, navbar: nextNavbar };
      })
    );
    setSaved(false);
  };

  const updateFooter = (field: "copyright" | "backgroundColor" | "textColor" | "padding" | "horizontalAlign" | "verticalAlign", value: string) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;
        const nextFooter = { ...defaultFooter, ...(page.footer ?? {}), [field]: value };
        return { ...page, footer: nextFooter };
      })
    );
    setSaved(false);
  };

  const updateFooterLogoPosition = (x: number, y: number) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;
        const nextFooter = { ...defaultFooter, ...(page.footer ?? {}), logoX: x, logoY: y };
        return { ...page, footer: nextFooter };
      })
    );
    setSaved(false);
  };

  const updateFooterLinks = (value: string) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;
        const nextFooter = { ...defaultFooter, ...(page.footer ?? {}), links: value.split(",").map((item) => item.trim()).filter(Boolean) };
        return { ...page, footer: nextFooter };
      })
    );
    setSaved(false);
  };

  const handleAssetUpload = (scope: "navbar" | "footer", file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setPages((prev) =>
        prev.map((page) => {
          if (page.id !== selectedPageId) return page;
          if (scope === "navbar") {
            return { ...page, navbar: { ...defaultNavbar, ...(page.navbar ?? {}), logoUrl: result } };
          }
          return { ...page, footer: { ...defaultFooter, ...(page.footer ?? {}), logoUrl: result } };
        })
      );
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const updateBlockField = <K extends keyof EditorBlock>(field: K, value: EditorBlock[K]) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;
        const updateNested = (blocks: EditorBlock[]): EditorBlock[] =>
          blocks.map((block) => {
            if (block.id === selectedBlockId) return { ...block, [field]: value };
            if (block.children?.length) {
              return { ...block, children: updateNested(block.children) };
            }
            return block;
          });

        return { ...page, blocks: updateNested(page.blocks) };
      })
    );
    setSaved(false);
  };

  const updateBlockStyle = <K extends keyof BlockStyle>(field: K, value: BlockStyle[K]) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;
        const updateNested = (blocks: EditorBlock[]): EditorBlock[] =>
          blocks.map((block) => {
            if (block.id === selectedBlockId) {
              return {
                ...block,
                style: {
                  ...block.style,
                  [field]: value,
                },
              };
            }
            if (block.children?.length) {
              return { ...block, children: updateNested(block.children) };
            }
            return block;
          });

        return { ...page, blocks: updateNested(page.blocks) };
      })
    );
    setSaved(false);
  };

  const addPage = () => {
    const nextPageId = `page-${Date.now()}` as PageTemplate;
    const nextPage: EditorPage = {
      id: nextPageId,
      name: `New Page ${pages.length + 1}`,
      slug: `new-page-${pages.length + 1}`,
      seoTitle: "New page",
      seoDescription: "A newly created page in your website.",
      blocks: [
        {
          id: `hero-${Date.now()}`,
          type: "hero",
          title: "New section",
          subtitle: "Add a clear headline and message for this page.",
          description: "Describe your offer and guide visitors toward action.",
          buttonLabel: "Call to action",
        },
      ],
    };

    setPages((prev) => [...prev, nextPage]);
    setSelectedPageId(nextPageId);
    setSelectedBlockId(nextPage.id === nextPageId ? nextPage.blocks[0].id : selectedBlockId);
    setLeftPanelTab("pages");
    setSaved(false);
  };

  const removeBlockFromTree = (blocks: EditorBlock[], blockId: string): { blocks: EditorBlock[]; removed: EditorBlock | null } => {
    for (let index = 0; index < blocks.length; index += 1) {
      const block = blocks[index];
      if (block.id === blockId) {
        const nextBlocks = blocks.filter((item) => item.id !== blockId);
        return { blocks: nextBlocks, removed: block };
      }

      if (block.children?.length) {
        const nested = removeBlockFromTree(block.children, blockId);
        if (nested.removed) {
          return {
            blocks: blocks.map((item) =>
              item.id === block.id ? { ...item, children: nested.blocks } : item
            ),
            removed: nested.removed,
          };
        }
      }
    }

    return { blocks, removed: null };
  };

  const reorderBlocks = (fromId: string, toId: string) => {
    if (!fromId || !toId || fromId === toId) return;

    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;

        const items = [...page.blocks];
        const fromIndex = items.findIndex((block) => block.id === fromId);
        const toIndex = items.findIndex((block) => block.id === toId);

        if (fromIndex < 0 || toIndex < 0) return page;

        const [moved] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, moved);

        return { ...page, blocks: items };
      })
    );
  };

  const onDropBlock = (targetId: string) => {
    if (!draggedBlockId || !targetId) return;
    reorderBlocks(draggedBlockId, targetId);
    setDraggedBlockId(null);
  };

  const removeBlock = (blockId: string) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;
        return { ...page, blocks: removeBlockFromTree(page.blocks, blockId).blocks };
      })
    );
    setDraggedBlockId(null);
    setSelectedBlockId("");
    setSaved(false);
  };

  const insertLibraryBlock = (kind: EditorBlock["type"], label: string, targetContainerId?: string) => {
    const blockId = `${kind}-${Date.now()}`;

    const newBlock: EditorBlock = {
      id: blockId,
      type: kind,
      title:
        kind === "container"
          ? "Container"
          : kind === "cta"
            ? "Call to action"
            : kind === "features"
              ? "Features"
              : kind === "hero"
                ? "Hero section"
                : kind === "testimonial"
                  ? "Customer story"
                  : label,
      subtitle:
        kind === "container"
          ? "Drop blocks inside this container."
          : kind === "cta"
            ? "Use this section to highlight your offer."
            : kind === "features"
              ? "Show the key benefits of your product."
              : kind === "hero"
                ? "A strong headline with supporting details."
                : "Add a polished message for your audience.",
      description:
        kind === "container"
          ? "Flexible layout container."
          : kind === "cta"
            ? "Guide visitors with a clear action and strong message."
            : kind === "hero"
              ? "Create a premium first impression with a simple message and call to action."
              : `Custom ${label.toLowerCase()} block`,
      buttonLabel: kind === "cta" ? "Get Started" : "Learn more",
      isContainer: kind === "container",
      children: kind === "container" ? [] : undefined,
      style: kind === "container"
        ? { width: "48%", minHeight: "180px", display: "flex", flexDirection: "column", gap: "12px", margin: "0 0 16px", padding: "16px", border: "1px solid rgba(96,165,250,0.28)", borderRadius: "18px", backgroundColor: "rgba(15,23,42,0.42)", boxShadow: "0 8px 24px rgba(15,23,42,0.18)" } as Partial<BlockStyle>
        : undefined,
    };

    const addBlock = (blocks: EditorBlock[]): EditorBlock[] => {
      if (targetContainerId) {
        return blocks.map((block) => {
          if (block.id === targetContainerId) {
            return { ...block, children: [...(block.children ?? []), newBlock] };
          }
          if (block.children?.length) {
            return { ...block, children: addBlock(block.children) };
          }
          return block;
        });
      }

      return [...blocks, newBlock];
    };

    setPages((prev) =>
      prev.map((page) =>
        page.id === selectedPageId ? { ...page, blocks: addBlock(page.blocks) } : page
      )
    );
    setSelectedBlockId(newBlock.id);
    setLeftPanelTab("settings");
    setSaved(false);
  };

  const insertBlockAtIndex = (blockToInsert: EditorBlock, index: number, targetContainerId?: string) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.id !== selectedPageId) return page;

        const removeExisting = (blocks: EditorBlock[]): EditorBlock[] => {
          const withoutCurrent = removeBlockFromTree(blocks, blockToInsert.id).blocks;
          return withoutCurrent;
        };

        const addIntoTarget = (blocks: EditorBlock[]): EditorBlock[] =>
          blocks.map((block) => {
            if (block.id === targetContainerId) {
              const children = [...(block.children ?? [])];
              const safeIndex = Math.max(0, Math.min(index, children.length));
              children.splice(safeIndex, 0, blockToInsert);
              return { ...block, children };
            }
            if (block.children?.length) {
              return { ...block, children: addIntoTarget(block.children) };
            }
            return block;
          });

        const nextBlocks = targetContainerId ? addIntoTarget(removeExisting(page.blocks)) : removeExisting(page.blocks);

        if (!targetContainerId) {
          const safeIndex = Math.max(0, Math.min(index, nextBlocks.length));
          nextBlocks.splice(safeIndex, 0, blockToInsert);
        }

        return { ...page, blocks: nextBlocks };
      })
    );
    setSaved(false);
  };

  const getDropInsertionIndex = (event: React.DragEvent<HTMLDivElement>, fallbackIndex = selectedPage.blocks.length) => {
    const canvas = blocksCanvasRef.current;
    if (!canvas) return fallbackIndex;

    const blockElements = Array.from(canvas.querySelectorAll("[data-block-id]")) as HTMLElement[];
    if (!blockElements.length) return fallbackIndex;

    const pointerY = event.clientY;
    const pointerX = event.clientX;

    const hoveredBlock = blockElements.find((element) => {
      const rect = element.getBoundingClientRect();
      return pointerX >= rect.left && pointerX <= rect.right && pointerY >= rect.top && pointerY <= rect.bottom;
    });

    if (hoveredBlock) {
      const hoveredId = hoveredBlock.dataset.blockId;
      const hoveredIndex = selectedPage.blocks.findIndex((block) => block.id === hoveredId);
      if (hoveredIndex >= 0) {
        const rect = hoveredBlock.getBoundingClientRect();
        const parentWidth = hoveredBlock.parentElement?.getBoundingClientRect().width ?? rect.width;
        const isCompact = rect.width < parentWidth * 0.85;
        const isAfter = isCompact ? pointerX > rect.left + rect.width * 0.55 : pointerY > rect.top + rect.height / 2;
        return hoveredIndex + (isAfter ? 1 : 0);
      }
    }

    let insertionIndex = selectedPage.blocks.length;
    for (let i = 0; i < blockElements.length; i += 1) {
      const rect = blockElements[i].getBoundingClientRect();
      const parentWidth = blockElements[i].parentElement?.getBoundingClientRect().width ?? rect.width;
      const isCompact = rect.width < parentWidth * 0.85;
      const shouldInsertBefore = isCompact ? pointerX < rect.left + rect.width * 0.5 : pointerY < rect.top + rect.height / 2;
      if (shouldInsertBefore) {
        insertionIndex = i;
        break;
      }
    }

    return insertionIndex;
  };

  const saveChanges = async () => {
    try {
      await saveWebsiteEditorDraft(
        id || "",
        pages.map((page, index) => ({
          id: page.id,
          title: page.name,
          slug: page.slug,
          sections: page.blocks,
          seo: {
            title: page.seoTitle,
            description: page.seoDescription,
            keywords: [],
          },
          sortOrder: index + 1,
        }))
      );
      setSaved(true);
    } catch (error) {
      console.error("Failed to save website draft", error);
      setSaved(false);
    }
  };

  const publishChanges = async () => {
    try {
      setPublishing(true);
      await saveChanges();
      await publishWebsite(id || "");
      setSaved(true);
    } catch (error) {
      console.error("Failed to publish website", error);
    } finally {
      setPublishing(false);
    }
  };

  const blockLibrary: Record<string, Array<{ label: string; icon: string; kind: EditorBlock["type"] }>> = {
    Layout: [
      { label: "Container", icon: "▭", kind: "container" },
      { label: "Grid", icon: "▦", kind: "features" },
    ],
    Basic: [
      { label: "Heading", icon: "T", kind: "text" },
      { label: "Image", icon: "◩", kind: "text" },
      { label: "Text Editor", icon: "≡", kind: "text" },
      { label: "Video", icon: "▶", kind: "text" },
      { label: "Button", icon: "⟡", kind: "cta" },
      { label: "Divider", icon: "—", kind: "text" },
      { label: "Spacer", icon: "⇕", kind: "text" },
      { label: "Google Maps", icon: "⌖", kind: "text" },
      { label: "Icon", icon: "✦", kind: "text" },
    ],
  };

  const renderPreviewBlock = (block: EditorBlock, depth = 0): React.ReactNode => {
    const style: CSSProperties = {
      width: block.style?.width ?? "100%",
      height: block.style?.height ?? "auto",
      minHeight: block.style?.minHeight ?? "auto",
      backgroundColor: block.style?.backgroundColor ?? "rgba(15, 23, 42, 0.42)",
      color: block.style?.textColor ?? "#e2e8f0",
      padding: block.style?.padding ?? "1rem",
      borderRadius: block.style?.borderRadius ?? "1rem",
      margin: block.style?.margin ?? "0 0 1rem",
      border: block.style?.border ?? "1px solid rgba(148,163,184,0.18)",
      display: block.style?.display ?? "block",
      flexDirection: (block.style?.flexDirection as CSSProperties["flexDirection"]) ?? "column",
      justifyContent: (block.style?.justifyContent as CSSProperties["justifyContent"]) ?? "flex-start",
      alignItems: (block.style?.alignItems as CSSProperties["alignItems"]) ?? "stretch",
      gap: block.style?.gap ?? "12px",
      position: (block.style?.position as CSSProperties["position"]) ?? "static",
      left: block.style?.left ?? "auto",
      top: block.style?.top ?? "auto",
      zIndex: Number(block.style?.zIndex ?? "0"),
      opacity: Number(block.style?.opacity ?? "1"),
      boxShadow: block.style?.boxShadow ?? "none",
    };

    const commonClass = "rounded-2xl border border-slate-200/10 text-left transition hover:border-blue-500/40";

    const onSelect = () => {
      setSelectedBlockId(block.id);
      setLeftPanelTab("settings");
    };

    if (block.type === "container" || block.isContainer) {
      return (
        <div
          key={block.id}
          onClick={onSelect}
          className={`${commonClass} relative overflow-hidden`}
          style={style}
        >
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-500">
            <span>Container</span>
            <span>{block.children?.length ?? 0} items</span>
          </div>
          <div className="flex min-h-[120px] flex-wrap gap-3" style={{ width: "100%" }}>
            {(block.children ?? []).map((child) => (
              <div key={child.id} className="w-full" style={{ flex: "1 1 48%" }}>
                {renderPreviewBlock(child, depth + 1)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "hero") {
      return (
        <section key={block.id} onClick={onSelect} className={`${commonClass} bg-gradient-to-r from-blue-600/20 to-cyan-500/10`} style={style}>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-blue-300">Hero</p>
          <h3 className="text-2xl font-bold text-white">{block.title}</h3>
          <p className="mt-3 text-sm text-slate-300">{block.subtitle}</p>
          <p className="mt-3 text-sm text-slate-400">{block.description}</p>
          <button className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            {block.buttonLabel || "Call to action"}
          </button>
        </section>
      );
    }

    if (block.type === "features") {
      return (
        <section key={block.id} onClick={onSelect} className={`${commonClass}`} style={style}>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-violet-300">Features</p>
          <h3 className="text-xl font-bold text-white">{block.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{block.subtitle}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((feature) => (
              <div key={feature} className="rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-xs text-slate-300">
                Feature {feature}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (block.type === "cta") {
      return (
        <section key={block.id} onClick={onSelect} className={`${commonClass} bg-gradient-to-r from-cyan-500/15 to-blue-500/15`} style={style}>
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-cyan-300">Call to action</p>
          <h3 className="text-xl font-bold text-white">{block.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{block.subtitle}</p>
          <button className="mt-4 rounded-xl border border-cyan-400/50 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100">
            {block.buttonLabel || "Learn more"}
          </button>
        </section>
      );
    }

    if (block.type === "testimonial") {
      return (
        <section key={block.id} onClick={onSelect} className={`${commonClass}`} style={style}>
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-amber-300">Testimonial</p>
          <h3 className="text-xl font-bold text-white">{block.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{block.subtitle}</p>
        </section>
      );
    }

    return (
      <section key={block.id} onClick={onSelect} className={`${commonClass}`} style={style}>
        <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-400">Text block</p>
        <h3 className="text-xl font-bold text-white">{block.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{block.description}</p>
      </section>
    );
  };

  const renderBlock = (block: EditorBlock, depth = 0) => {
    const style: CSSProperties = {
      width: block.style?.width ?? "100%",
      height: block.style?.height ?? "auto",
      minHeight: block.style?.minHeight ?? "auto",
      backgroundColor: block.style?.backgroundColor ?? "rgba(15, 23, 42, 0.42)",
      color: block.style?.textColor ?? "#e2e8f0",
      padding: block.style?.padding ?? "1rem",
      borderRadius: block.style?.borderRadius ?? "1rem",
      margin: block.style?.margin ?? "0 0 1rem",
      border: block.style?.border ?? "1px solid rgba(148,163,184,0.18)",
      display: block.style?.display ?? "block",
      flexDirection: (block.style?.flexDirection as CSSProperties["flexDirection"]) ?? "column",
      justifyContent: (block.style?.justifyContent as CSSProperties["justifyContent"]) ?? "flex-start",
      alignItems: (block.style?.alignItems as CSSProperties["alignItems"]) ?? "stretch",
      gap: block.style?.gap ?? "12px",
      position: (block.style?.position as CSSProperties["position"]) ?? "static",
      left: block.style?.left ?? "auto",
      top: block.style?.top ?? "auto",
      zIndex: Number(block.style?.zIndex ?? "0"),
      opacity: Number(block.style?.opacity ?? "1"),
      boxShadow: block.style?.boxShadow ?? "none",
    };

    const commonClass = "rounded-2xl border border-slate-200/10 text-left";

    if (block.type === "container" || block.isContainer) {
      return (
        <div
          key={block.id}
          data-block-id={block.id}
          data-container-id={block.id}
          className={`${commonClass} relative overflow-hidden`}
          style={style}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            event.stopPropagation();

            const rawPayload = event.dataTransfer.getData("text/plain");
            if (!rawPayload) return;

            try {
              const parsed = JSON.parse(rawPayload) as { type?: "block" | "library"; kind?: EditorBlock["type"]; label?: string; id?: string };
              const targetContainerId = block.id;

              if (parsed.type === "library" && parsed.kind) {
                const newBlock = {
                  id: `${parsed.kind}-${Date.now()}`,
                  type: parsed.kind || "text",
                  title: parsed.label || "Block",
                  subtitle: "Add your custom content here.",
                  description: "Custom content block.",
                  buttonLabel: "Learn more",
                  isContainer: parsed.kind === "container",
                  children: parsed.kind === "container" ? [] : undefined,
                  style: parsed.kind === "container"
                    ? { width: "100%", minHeight: "120px", display: "flex", flexDirection: "column", gap: "12px", margin: "0", padding: "14px", border: "1px solid rgba(96,165,250,0.28)", borderRadius: "14px", backgroundColor: "rgba(15,23,42,0.42)", boxShadow: "0 8px 20px rgba(15,23,42,0.18)" } as Partial<BlockStyle>
                    : undefined,
                } as EditorBlock;

                insertBlockAtIndex(newBlock, (block.children ?? []).length, targetContainerId);
                setSelectedBlockId(newBlock.id);
                setLeftPanelTab("settings");
                return;
              }

              if (parsed.type === "block" && parsed.id) {
                const currentIndex = (block.children ?? []).findIndex((item) => item.id === parsed.id);
                if (currentIndex >= 0) return;
                const nextBlock = findBlockById(selectedPage.blocks, parsed.id);
                if (!nextBlock) return;

                const moveIntoContainer = (blocks: EditorBlock[]): EditorBlock[] =>
                  blocks.map((item) => {
                    if (item.id === targetContainerId) {
                      const existingChildren = [...(item.children ?? [])];
                      return { ...item, children: [...existingChildren, nextBlock] };
                    }
                    if (item.children?.length) {
                      return { ...item, children: moveIntoContainer(item.children) };
                    }
                    return item;
                  });

                setPages((prev) =>
                  prev.map((page) =>
                    page.id === selectedPageId ? { ...page, blocks: moveIntoContainer(page.blocks) } : page
                  )
                );
              }
            } catch {
              // ignore malformed payloads
            }
          }}
        >
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-500">
            <span>Container</span>
            <span>{block.children?.length ?? 0} items</span>
          </div>
          <div className="flex min-h-[120px] flex-wrap gap-3" style={{ width: "100%" }}>
            {(block.children ?? []).map((child) => (
              <div key={child.id} className="w-full" style={{ flex: "1 1 48%" }}>
                {renderBlock(child, depth + 1)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "hero") {
      return (
        <section key={block.id} className={`${commonClass} bg-gradient-to-r from-blue-600/20 to-cyan-500/10`} style={style}>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-blue-300">Hero</p>
          <h3 className="text-2xl font-bold text-white">{block.title}</h3>
          <p className="mt-3 text-sm text-slate-300">{block.subtitle}</p>
          <p className="mt-3 text-sm text-slate-400">{block.description}</p>
          <button className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            {block.buttonLabel || "Call to action"}
          </button>
        </section>
      );
    }

    if (block.type === "features") {
      return (
        <section key={block.id} className={`${commonClass}`} style={style}>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-violet-300">Features</p>
          <h3 className="text-xl font-bold text-white">{block.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{block.subtitle}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((feature) => (
              <div key={feature} className="rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-xs text-slate-300">
                Feature {feature}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (block.type === "cta") {
      return (
        <section key={block.id} className={`${commonClass} bg-gradient-to-r from-cyan-500/15 to-blue-500/15`} style={style}>
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-cyan-300">Call to action</p>
          <h3 className="text-xl font-bold text-white">{block.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{block.subtitle}</p>
          <button className="mt-4 rounded-xl border border-cyan-400/50 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100">
            {block.buttonLabel || "Learn more"}
          </button>
        </section>
      );
    }

    if (block.type === "testimonial") {
      return (
        <section key={block.id} className={`${commonClass}`} style={style}>
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-amber-300">Testimonial</p>
          <h3 className="text-xl font-bold text-white">{block.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{block.subtitle}</p>
        </section>
      );
    }

    return (
      <section key={block.id} className={`${commonClass}`} style={style}>
        <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-400">Text block</p>
        <h3 className="text-xl font-bold text-white">{block.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{block.description}</p>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] px-4 py-12 text-white">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-center">
          <p className="text-lg font-semibold text-slate-200">Loading website editor...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const currentNavbar = selectedPage?.navbar ?? defaultNavbar;
  const currentFooter = selectedPage?.footer ?? defaultFooter;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[7%] top-[-140px] h-[360px] w-[360px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-[5%] top-[25%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <main className="relative z-10 flex h-screen flex-col overflow-hidden">
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 px-4 py-4 backdrop-blur-sm sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/websites")}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-200 transition hover:border-blue-500/40 hover:text-white"
                aria-label="Back to websites"
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-blue-400">Website Studio</p>
                <h1 className="text-xl font-bold sm:text-2xl">{project.name}</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 sm:text-sm">
                <LayoutTemplate size={15} />
                Edit all pages
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 sm:text-sm">
                <Copy size={15} />
                Duplicate page
              </button>

              <button
                onClick={() => setPreviewMode((value) => !value)}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 sm:text-sm"
              >
                <Monitor size={15} />
                {previewMode ? "Exit preview" : "Live preview"}
              </button>

              <button
                onClick={saveChanges}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 sm:text-sm"
              >
                <Save size={15} />
                Save
              </button>

              <button
                onClick={() => void publishChanges()}
                disabled={publishing}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
              >
                <Check size={15} />
                {publishing ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </header>

        {saved && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            <Check size={15} />
            Draft saved successfully.
          </div>
        )}

        <div className="grid flex-1 overflow-hidden xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="h-full overflow-y-auto border-r border-slate-800 bg-[#171d27] p-3 shadow-2xl shadow-black/20">
            <div className="mb-3 flex gap-2 rounded-xl border border-slate-700 bg-slate-900/70 p-1">
              {[
                { key: "blocks", label: "Blocks" },
                { key: "pages", label: "Pages" },
                { key: "settings", label: "Settings" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setLeftPanelTab(tab.key as "blocks" | "pages" | "settings")}
                  className={`flex-1 rounded-lg px-2 py-2 text-xs font-semibold transition ${
                    leftPanelTab === tab.key
                      ? "bg-slate-700 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {leftPanelTab === "blocks" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-400">
                  <span className="text-sm">⌕</span>
                  <input
                    placeholder="Search Widget..."
                    className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 border-b border-slate-700 pb-2 text-xs font-semibold text-slate-400">
                  <button className="text-white">Widgets</button>
                  <button className="opacity-70">Globals</button>
                </div>

                {Object.entries(blockLibrary).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      <span className="text-white">▼</span>
                      {category}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {items.map((item) => (
                        <div
                          key={item.label}
                          draggable
                          onDragStart={(event) => {
                            const payload = { type: "library" as const, kind: item.kind, label: item.label };
                            event.dataTransfer.setData("text/plain", JSON.stringify(payload));
                            event.dataTransfer.effectAllowed = "copy";
                          }}
                          onDragEnd={() => {
                            setDraggedBlockId(null);
                          }}
                          onClick={() => insertLibraryBlock(item.kind, item.label)}
                          className="flex h-[82px] flex-col items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:border-blue-500/50 hover:bg-slate-800"
                        >
                          <span className="text-xl font-bold text-slate-200">{item.icon}</span>
                          <span className="text-xs font-medium text-slate-300">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {leftPanelTab === "pages" && (
              <div>
                <div className="mb-3 flex items-center justify-between gap-2 px-1">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Pages</p>
                    <h2 className="text-sm font-bold text-white">Page list</h2>
                  </div>

                  <button
                    onClick={addPage}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-200 transition hover:border-blue-500/40 hover:text-white"
                    aria-label="Add page"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <div className="space-y-1.5">
                  {pages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => {
                        setSelectedPageId(page.id);
                        setSelectedBlockId("");
                        setLeftPanelTab("pages");
                      }}
                      className={`flex w-full items-center justify-between rounded-xl border px-2.5 py-2.5 text-left transition ${
                        selectedPageId === page.id
                          ? "border-blue-500/50 bg-blue-500/10 text-white"
                          : "border-transparent bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{page.name}</div>
                        <div className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-500">/{page.slug}</div>
                      </div>

                      <div className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-300">
                        <GripVertical size={12} />
                      </div>
                    </button>
                  ))}
                </div>

                {selectedPage && (
                  <div className="mt-4 space-y-3 rounded-2xl border border-slate-700 bg-slate-950/40 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Selected page</p>
                    </div>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Page name</span>
                      <input
                        value={selectedPage.name}
                        onChange={(e) => updatePageField("name", e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Page slug</span>
                      <input
                        value={selectedPage.slug}
                        onChange={(e) => updatePageField("slug", e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">SEO title</span>
                      <input
                        value={selectedPage.seoTitle}
                        onChange={(e) => updatePageField("seoTitle", e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">SEO description</span>
                      <textarea
                        value={selectedPage.seoDescription}
                        onChange={(e) => updatePageField("seoDescription", e.target.value)}
                        rows={3}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {leftPanelTab === "settings" && (
              <div className="space-y-4">
                <div className="mb-4 flex items-center justify-between gap-2 border-b border-slate-700 pb-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Settings</p>
                    <h2 className="text-sm font-bold text-white">Block settings</h2>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Edit3 size={14} />
                  </div>
                </div>

                {selectedBlockId === NAVBAR_BLOCK_ID && (
                  <div className="space-y-4">
                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Brand name</span>
                      <input
                        value={currentNavbar.brand}
                        onChange={(e) => updateNavbar("brand", e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Logo image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAssetUpload("navbar", e.target.files?.[0] ?? null)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-200"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Links</span>
                      <input
                        value={currentNavbar.links.join(", ")}
                        onChange={(e) => updateNavbarLinks(e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">CTA text</span>
                      <input
                        value={currentNavbar.cta}
                        onChange={(e) => updateNavbar("cta", e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Background</span>
                      <input type="color" value={currentNavbar.backgroundColor} onChange={(e) => updateNavbar("backgroundColor", e.target.value)} className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 p-1" />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Text color</span>
                      <input type="color" value={currentNavbar.textColor} onChange={(e) => updateNavbar("textColor", e.target.value)} className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 p-1" />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Padding</span>
                      <input value={currentNavbar.padding} onChange={(e) => updateNavbar("padding", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60" />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Horizontal align</span>
                      <select value={currentNavbar.horizontalAlign} onChange={(e) => updateNavbar("horizontalAlign", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60">
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Vertical align</span>
                      <select value={currentNavbar.verticalAlign} onChange={(e) => updateNavbar("verticalAlign", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60">
                        <option value="top">Top</option>
                        <option value="middle">Middle</option>
                        <option value="bottom">Bottom</option>
                      </select>
                    </label>
                  </div>
                )}

                {selectedBlockId === FOOTER_BLOCK_ID && (
                  <div className="space-y-4">
                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Logo image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAssetUpload("footer", e.target.files?.[0] ?? null)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-200"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Copyright</span>
                      <input
                        value={currentFooter.copyright}
                        onChange={(e) => updateFooter("copyright", e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Footer links</span>
                      <input
                        value={currentFooter.links.join(", ")}
                        onChange={(e) => updateFooterLinks(e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Background</span>
                      <input type="color" value={currentFooter.backgroundColor} onChange={(e) => updateFooter("backgroundColor", e.target.value)} className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 p-1" />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Text color</span>
                      <input type="color" value={currentFooter.textColor} onChange={(e) => updateFooter("textColor", e.target.value)} className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 p-1" />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Padding</span>
                      <input value={currentFooter.padding} onChange={(e) => updateFooter("padding", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60" />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Horizontal align</span>
                      <select value={currentFooter.horizontalAlign} onChange={(e) => updateFooter("horizontalAlign", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60">
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Vertical align</span>
                      <select value={currentFooter.verticalAlign} onChange={(e) => updateFooter("verticalAlign", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60">
                        <option value="top">Top</option>
                        <option value="middle">Middle</option>
                        <option value="bottom">Bottom</option>
                      </select>
                    </label>
                  </div>
                )}

                {selectedBlock && selectedBlockId !== NAVBAR_BLOCK_ID && selectedBlockId !== FOOTER_BLOCK_ID && !isPageSettingsMode && (
                  <>
                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Block title</span>
                      <input
                        value={selectedBlock.title}
                        onChange={(e) => updateBlockField("title", e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Subtitle</span>
                      <input
                        value={selectedBlock.subtitle || ""}
                        onChange={(e) => updateBlockField("subtitle", e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm text-slate-300">Description</span>
                      <textarea
                        value={selectedBlock.description || ""}
                        onChange={(e) => updateBlockField("description", e.target.value)}
                        rows={3}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-white outline-none transition focus:border-blue-500/60"
                      />
                    </label>

                    <div className="space-y-3 rounded-2xl border border-slate-700 bg-slate-950/40 p-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Style</p>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Width</span>
                        <input
                          value={selectedBlock.style?.width ?? "100%"}
                          onChange={(e) => updateBlockStyle("width", e.target.value)}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Height</span>
                        <input
                          value={selectedBlock.style?.height ?? "auto"}
                          onChange={(e) => updateBlockStyle("height", e.target.value)}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Padding</span>
                        <input
                          value={selectedBlock.style?.padding ?? "1rem"}
                          onChange={(e) => updateBlockStyle("padding", e.target.value)}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Margin</span>
                        <input
                          value={selectedBlock.style?.margin ?? "0 0 1rem"}
                          onChange={(e) => updateBlockStyle("margin", e.target.value)}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Border</span>
                        <input
                          value={selectedBlock.style?.border ?? "1px solid rgba(148,163,184,0.18)"}
                          onChange={(e) => updateBlockStyle("border", e.target.value)}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Display</span>
                        <select value={selectedBlock.style?.display ?? "block"} onChange={(e) => updateBlockStyle("display", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60">
                          <option value="block">Block</option>
                          <option value="flex">Flex</option>
                          <option value="grid">Grid</option>
                          <option value="inline-block">Inline block</option>
                        </select>
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Justify content</span>
                        <select value={selectedBlock.style?.justifyContent ?? "flex-start"} onChange={(e) => updateBlockStyle("justifyContent", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60">
                          <option value="flex-start">Start</option>
                          <option value="center">Center</option>
                          <option value="space-between">Space between</option>
                          <option value="space-around">Space around</option>
                        </select>
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Align items</span>
                        <select value={selectedBlock.style?.alignItems ?? "stretch"} onChange={(e) => updateBlockStyle("alignItems", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60">
                          <option value="stretch">Stretch</option>
                          <option value="center">Center</option>
                          <option value="flex-start">Start</option>
                          <option value="flex-end">End</option>
                        </select>
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Gap</span>
                        <input
                          value={selectedBlock.style?.gap ?? "12px"}
                          onChange={(e) => updateBlockStyle("gap", e.target.value)}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Position</span>
                        <select value={selectedBlock.style?.position ?? "static"} onChange={(e) => updateBlockStyle("position", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60">
                          <option value="static">Static</option>
                          <option value="relative">Relative</option>
                          <option value="absolute">Absolute</option>
                          <option value="fixed">Fixed</option>
                        </select>
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Left</span>
                        <input value={selectedBlock.style?.left ?? "auto"} onChange={(e) => updateBlockStyle("left", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60" />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Top</span>
                        <input value={selectedBlock.style?.top ?? "auto"} onChange={(e) => updateBlockStyle("top", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60" />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Z-index</span>
                        <input value={selectedBlock.style?.zIndex ?? "0"} onChange={(e) => updateBlockStyle("zIndex", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60" />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Opacity</span>
                        <input value={selectedBlock.style?.opacity ?? "1"} onChange={(e) => updateBlockStyle("opacity", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60" />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Shadow</span>
                        <input value={selectedBlock.style?.boxShadow ?? "none"} onChange={(e) => updateBlockStyle("boxShadow", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60" />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Background</span>
                        <input
                          type="color"
                          value={selectedBlock.style?.backgroundColor ?? "#0f172a"}
                          onChange={(e) => updateBlockStyle("backgroundColor", e.target.value)}
                          className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 p-1"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Text color</span>
                        <input
                          type="color"
                          value={selectedBlock.style?.textColor ?? "#e2e8f0"}
                          onChange={(e) => updateBlockStyle("textColor", e.target.value)}
                          className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 p-1"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-slate-300">Border radius</span>
                        <input
                          value={selectedBlock.style?.borderRadius ?? "1rem"}
                          onChange={(e) => updateBlockStyle("borderRadius", e.target.value)}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500/60"
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
            )}
          </aside>

          <section className="h-full overflow-hidden border-l border-slate-800 bg-slate-900/70 p-3">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Editor canvas</p>
                <h2 className="text-lg font-bold text-white">{selectedPage.name}</h2>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-1">
                {[
                  { key: "mobile", label: "Mobile", icon: <Smartphone size={14} /> },
                  { key: "tablet", label: "Tablet", icon: <Tablet size={14} /> },
                  { key: "laptop", label: "Laptop", icon: <Monitor size={14} /> },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setDevice(item.key as DeviceType)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                      device === item.key
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-full overflow-y-auto rounded-[28px] border border-slate-800 bg-[#070d1f] p-3 shadow-2xl shadow-black/20">
              <div className="mx-auto flex min-h-[720px] items-center justify-center rounded-[18px] border border-slate-800 bg-slate-950/70 p-3">
                {previewMode ? (
                  <div className="w-full" style={{ maxWidth: deviceWidthMap[device] }}>
                    {previewUrl ? (
                      <iframe
                        title={`${selectedPage.name} live preview`}
                        src={`${previewUrl.replace(/\/$/, "")}/${selectedPage.slug === "home" ? "" : selectedPage.slug}`}
                        className="h-[720px] w-full rounded-[20px] border border-slate-700 bg-white shadow-2xl shadow-blue-950/20"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div className="flex h-[720px] items-center justify-center rounded-[20px] border border-slate-800 bg-slate-900/80 text-sm text-slate-400">
                        Live preview is not available yet.
                      </div>
                    )}

                    <div className="hidden">
                    <div className="space-y-4 rounded-2xl bg-slate-950/40 p-3">
                      <div
                        className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-300"
                        style={{
                          backgroundColor: currentNavbar.backgroundColor,
                          color: currentNavbar.textColor,
                          padding: currentNavbar.padding,
                          position: "relative",
                        }}
                      >
                        <nav
                          className="flex flex-wrap items-center gap-3 text-[10px]"
                          style={{
                            justifyContent: currentNavbar.horizontalAlign === "center" ? "center" : currentNavbar.horizontalAlign === "right" ? "flex-end" : "flex-start",
                            alignItems: currentNavbar.verticalAlign === "top" ? "flex-start" : currentNavbar.verticalAlign === "bottom" ? "flex-end" : "center",
                            textAlign: currentNavbar.horizontalAlign,
                            minHeight: "48px",
                            position: "relative",
                          }}
                        >
                          {currentNavbar.logoUrl ? (
                            <img
                              src={currentNavbar.logoUrl}
                              alt="Brand logo"
                              style={{
                                position: "relative",
                                left: currentNavbar.logoX ?? 0,
                                top: currentNavbar.logoY ?? 0,
                                height: 28,
                                width: 28,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              className="object-cover"
                            />
                          ) : null}
                          <span className="font-semibold" style={{ color: currentNavbar.textColor }}>{currentNavbar.brand}</span>
                          {currentNavbar.links.map((link) => (
                            <span key={link} style={{ color: currentNavbar.textColor }}>{link}</span>
                          ))}
                          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-2 py-1 text-blue-200">{currentNavbar.cta}</span>
                        </nav>
                      </div>

                      <div className="space-y-4">
                        {selectedPage.blocks.map((block) => renderPreviewBlock(block))}
                      </div>

                      <div
                        className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-300"
                        style={{
                          backgroundColor: currentFooter.backgroundColor,
                          color: currentFooter.textColor,
                          padding: currentFooter.padding,
                          position: "relative",
                        }}
                      >
                        <div
                          className="flex flex-wrap items-center gap-3 text-[10px]"
                          style={{
                            justifyContent: currentFooter.horizontalAlign === "center" ? "center" : currentFooter.horizontalAlign === "right" ? "flex-end" : "flex-start",
                            alignItems: currentFooter.verticalAlign === "top" ? "flex-start" : currentFooter.verticalAlign === "bottom" ? "flex-end" : "center",
                            textAlign: currentFooter.horizontalAlign,
                            minHeight: "48px",
                            position: "relative",
                          }}
                        >
                          {currentFooter.logoUrl ? (
                            <img
                              src={currentFooter.logoUrl}
                              alt="Footer logo"
                              style={{
                                position: "relative",
                                left: currentFooter.logoX ?? 0,
                                top: currentFooter.logoY ?? 0,
                                height: 28,
                                width: 28,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              className="object-cover"
                            />
                          ) : null}
                          {currentFooter.links.map((link) => (
                            <span key={link} style={{ color: currentFooter.textColor }}>{link}</span>
                          ))}
                          <span style={{ color: currentFooter.textColor }}>{currentFooter.copyright}</span>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={blocksCanvasRef}
                    className="w-full overflow-hidden rounded-[20px] border border-slate-800 bg-slate-900/80 shadow-2xl shadow-blue-950/20 transition-all duration-300"
                    style={{ maxWidth: deviceWidthMap[device], width: "100%" }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      try {
                        const rawPayload = event.dataTransfer.getData("text/plain");
                        if (rawPayload) {
                          const parsed = JSON.parse(rawPayload) as { type?: "block" | "library"; kind?: EditorBlock["type"]; label?: string; id?: string };
                          const targetContainerId = (event.target as HTMLElement).closest("[data-container-id]")?.getAttribute("data-container-id") || undefined;

                          if (parsed.type === "library" && parsed.kind) {
                            const index = getDropInsertionIndex(event, selectedPage.blocks.length);
                            const newBlock = {
                              id: `${parsed.kind}-${Date.now()}`,
                              type: parsed.kind || "text",
                              title: parsed.label || "Block",
                              subtitle: "Add your custom content here.",
                              description: "Custom content block.",
                              buttonLabel: "Learn more",
                              isContainer: parsed.kind === "container",
                              children: parsed.kind === "container" ? [] : undefined,
                              style: parsed.kind === "container"
                                ? { width: "100%", minHeight: "120px", display: "flex", flexDirection: "column", gap: "12px", margin: "0", padding: "14px", border: "1px solid rgba(96,165,250,0.28)", borderRadius: "14px", backgroundColor: "rgba(15,23,42,0.42)", boxShadow: "0 8px 20px rgba(15,23,42,0.18)" } as Partial<BlockStyle>
                                : undefined,
                            } as EditorBlock;
                            if (targetContainerId) {
                              insertBlockAtIndex(newBlock, 9999, targetContainerId);
                            } else {
                              insertBlockAtIndex(newBlock, index);
                            }
                            setSelectedBlockId(newBlock.id);
                            setLeftPanelTab("settings");
                            setDraggedBlockId(null);
                            return;
                          }
                          if (parsed.type === "block" && parsed.id) {
                            const targetElement = (event.target as HTMLElement).closest("[data-block-id]") as HTMLElement | null;
                            const targetId = targetElement?.dataset.blockId || parsed.id;
                            const targetIndex = selectedPage.blocks.findIndex((block) => block.id === targetId);
                            const blockIndex = selectedPage.blocks.findIndex((block) => block.id === parsed.id);
                            if (targetIndex >= 0 && blockIndex >= 0 && targetId !== parsed.id) {
                              const nextBlocks = [...selectedPage.blocks];
                              const [moved] = nextBlocks.splice(blockIndex, 1);
                              const offset = targetIndex > blockIndex ? 1 : 0;
                              nextBlocks.splice(targetIndex + offset, 0, moved);
                              setPages((prev) => prev.map((page) => page.id === selectedPageId ? { ...page, blocks: nextBlocks } : page));
                            }
                            setDraggedBlockId(null);
                            return;
                          }
                        }
                      } catch {
                        // ignore malformed payloads
                      }

                      if (draggedBlockId) {
                        const targetId = (event.target as HTMLElement).closest("[data-block-id]")?.getAttribute("data-block-id") || "";
                        if (targetId) {
                          onDropBlock(targetId);
                        }
                      }
                      setDraggedBlockId(null);
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-3 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <MousePointer2 size={14} className="text-blue-400" />
                        Drag blocks to reorder
                      </div>
                      <div className="rounded-full border border-slate-700 px-2 py-1">{selectedPage.name}</div>
                    </div>

                    <div
                      className={`mb-4 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-300 transition ${selectedBlockId === NAVBAR_BLOCK_ID ? "border-blue-500/60 bg-blue-500/10" : ""}`}
                      onClick={() => {
                        setSelectedBlockId(NAVBAR_BLOCK_ID);
                        setLeftPanelTab("settings");
                      }}
                      style={{
                        backgroundColor: currentNavbar.backgroundColor,
                        color: currentNavbar.textColor,
                        padding: currentNavbar.padding,
                        position: "relative",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>Navbar</span>
                        <span className="text-[10px] text-slate-400">Edit</span>
                      </div>
                      <nav
                        className="mt-3 flex flex-wrap items-center gap-3 text-[10px]"
                        style={{
                          justifyContent: currentNavbar.horizontalAlign === "center" ? "center" : currentNavbar.horizontalAlign === "right" ? "flex-end" : "flex-start",
                          alignItems: currentNavbar.verticalAlign === "top" ? "flex-start" : currentNavbar.verticalAlign === "bottom" ? "flex-end" : "center",
                          textAlign: currentNavbar.horizontalAlign,
                          minHeight: "48px",
                          position: "relative",
                        }}
                      >
                        {currentNavbar.logoUrl ? (
                          <img
                            src={currentNavbar.logoUrl}
                            alt="Brand logo"
                            draggable
                            onDragStart={(event) => {
                              event.dataTransfer.setData("application/logo-scope", "navbar");
                            }}
                            onDragEnd={(event) => {
                              const rect = event.currentTarget.parentElement?.getBoundingClientRect();
                              if (!rect) return;
                              const x = Math.max(0, Math.min(250, event.clientX - rect.left));
                              const y = Math.max(0, Math.min(40, event.clientY - rect.top));
                              updateNavbarLogoPosition(x, y);
                            }}
                            style={{
                              position: "relative",
                              left: currentNavbar.logoX ?? 0,
                              top: currentNavbar.logoY ?? 0,
                              height: 28,
                              width: 28,
                              borderRadius: "50%",
                              objectFit: "cover",
                              cursor: "move",
                            }}
                            className="object-cover"
                          />
                        ) : null}
                        <span className="font-semibold" style={{ color: currentNavbar.textColor }}>{currentNavbar.brand}</span>
                        {currentNavbar.links.map((link) => (
                          <span key={link} style={{ color: currentNavbar.textColor }}>{link}</span>
                        ))}
                        <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-2 py-1 text-blue-200">{currentNavbar.cta}</span>
                      </nav>
                    </div>

                    <div className="flex flex-wrap gap-4 p-4" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                      {selectedPage.blocks.map((block) => (
                        <div
                          key={block.id}
                          draggable
                          data-block-id={block.id}
                          onDragStart={(event) => {
                            const payload = { type: "block" as const, id: block.id };
                            setDraggedBlockId(block.id);
                            event.dataTransfer.effectAllowed = "move";
                            event.dataTransfer.setData("text/plain", JSON.stringify(payload));
                          }}
                          onDragEnd={() => {
                            setDraggedBlockId(null);
                          }}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={(event) => {
                            event.preventDefault();
                            event.stopPropagation();

                            const targetId = (event.currentTarget as HTMLElement).getAttribute("data-block-id") || "";
                            const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
                            const parentWidth = (event.currentTarget as HTMLElement).parentElement?.getBoundingClientRect().width ?? rect.width;
                            const isCompact = rect.width < parentWidth * 0.85;
                            const isAfter = isCompact ? event.clientX > rect.left + rect.width * 0.55 : event.clientY > rect.top + rect.height / 2;
                            const rawPayload = event.dataTransfer.getData("text/plain");

                            try {
                              if (rawPayload) {
                                const parsed = JSON.parse(rawPayload) as { type?: "block" | "library"; kind?: EditorBlock["type"]; label?: string; id?: string };
                                if (parsed.type === "library" && parsed.kind) {
                                  const newBlock = {
                                    id: `${parsed.kind}-${Date.now()}`,
                                    type: parsed.kind || "text",
                                    title: parsed.label || "Block",
                                    subtitle: "Add your custom content here.",
                                    description: "Custom content block.",
                                    buttonLabel: "Learn more",
                                    isContainer: parsed.kind === "container",
                                    children: parsed.kind === "container" ? [] : undefined,
                                    style: parsed.kind === "container"
                                      ? { width: "100%", minHeight: "120px", display: "flex", flexDirection: "column", gap: "12px", margin: "0", padding: "14px", border: "1px solid rgba(96,165,250,0.28)", borderRadius: "14px", backgroundColor: "rgba(15,23,42,0.42)", boxShadow: "0 8px 20px rgba(15,23,42,0.18)" } as Partial<BlockStyle>
                                      : undefined,
                                  } as EditorBlock;
                                  const targetIndex = selectedPage.blocks.findIndex((item) => item.id === targetId);
                                  if (targetIndex >= 0) {
                                    insertBlockAtIndex(newBlock, targetIndex + (isAfter ? 1 : 0));
                                  } else {
                                    insertBlockAtIndex(newBlock, selectedPage.blocks.length);
                                  }
                                  setSelectedBlockId(newBlock.id);
                                  setLeftPanelTab("settings");
                                  setDraggedBlockId(null);
                                  return;
                                }
                              }
                            } catch {
                              // ignore malformed payload
                            }

                            if (targetId && targetId !== block.id && draggedBlockId) {
                              onDropBlock(targetId);
                            }
                            setDraggedBlockId(null);
                          }}
                          onMouseDown={() => selectBlock(block.id)}
                          onClick={() => selectBlock(block.id)}
                          className={`cursor-pointer rounded-2xl border transition ${
                            selectedBlockId === block.id
                              ? "border-blue-500/50 bg-blue-500/5 shadow-lg shadow-blue-500/10"
                              : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                          }`}
                          style={{
                            width: block.style?.width ?? "100%",
                            height: block.style?.height ?? "auto",
                            backgroundColor: block.style?.backgroundColor ?? "rgba(15, 23, 42, 0.35)",
                            padding: block.style?.padding ?? "0",
                            borderRadius: block.style?.borderRadius ?? "1rem",
                          }}
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                            <span>{block.type}</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  removeBlock(block.id);
                                }}
                                className="flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] font-semibold text-slate-200 hover:border-red-500/50 hover:text-red-300"
                                title="Cut block"
                              >
                                ✂ Cut
                              </button>
                              <span className="flex items-center gap-1 text-slate-400">
                                <GripVertical size={12} />
                                drag
                              </span>
                            </div>
                          </div>
                          <div className="p-3">{renderBlock(block)}</div>
                          <div
                            className="absolute bottom-2 right-2 h-4 w-4 cursor-se-resize rounded-sm border border-blue-400 bg-blue-500/70"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setSelectedBlockId(block.id);
                              setLeftPanelTab("settings");
                              setResizeState({
                                id: block.id,
                                startX: event.clientX,
                                startY: event.clientY,
                                startWidth: block.style?.width ?? "100%",
                                startHeight: block.style?.height ?? "auto",
                              });
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div
                      className={`mt-4 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-300 transition ${selectedBlockId === FOOTER_BLOCK_ID ? "border-blue-500/60 bg-blue-500/10" : ""}`}
                      onClick={() => {
                        setSelectedBlockId(FOOTER_BLOCK_ID);
                        setLeftPanelTab("settings");
                      }}
                      style={{
                        backgroundColor: currentFooter.backgroundColor,
                        color: currentFooter.textColor,
                        padding: currentFooter.padding,
                        position: "relative",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>Footer</span>
                        <span className="text-[10px] text-slate-400">Edit</span>
                      </div>
                      <div
                        className="mt-3 flex flex-wrap items-center gap-3 text-[10px]"
                        style={{
                          justifyContent: currentFooter.horizontalAlign === "center" ? "center" : currentFooter.horizontalAlign === "right" ? "flex-end" : "flex-start",
                          alignItems: currentFooter.verticalAlign === "top" ? "flex-start" : currentFooter.verticalAlign === "bottom" ? "flex-end" : "center",
                          textAlign: currentFooter.horizontalAlign,
                          minHeight: "48px",
                          position: "relative",
                        }}
                      >
                        {currentFooter.logoUrl ? (
                          <img
                            src={currentFooter.logoUrl}
                            alt="Footer logo"
                            draggable
                            onDragStart={(event) => {
                              event.dataTransfer.setData("application/logo-scope", "footer");
                            }}
                            onDragEnd={(event) => {
                              const rect = event.currentTarget.parentElement?.getBoundingClientRect();
                              if (!rect) return;
                              const x = Math.max(0, Math.min(250, event.clientX - rect.left));
                              const y = Math.max(0, Math.min(40, event.clientY - rect.top));
                              updateFooterLogoPosition(x, y);
                            }}
                            style={{
                              position: "relative",
                              left: currentFooter.logoX ?? 0,
                              top: currentFooter.logoY ?? 0,
                              height: 28,
                              width: 28,
                              borderRadius: "50%",
                              objectFit: "cover",
                              cursor: "move",
                            }}
                            className="object-cover"
                          />
                        ) : null}
                        {currentFooter.links.map((link) => (
                          <span key={link} style={{ color: currentFooter.textColor }}>{link}</span>
                        ))}
                        <span style={{ color: currentFooter.textColor }}>{currentFooter.copyright}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default WebsiteEditor;
