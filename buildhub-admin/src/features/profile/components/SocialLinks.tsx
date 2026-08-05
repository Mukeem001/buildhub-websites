import {
  Globe,
  Link,
  User,
} from "lucide-react";

interface SocialLinksData {
  website: string;
  twitter: string;
  linkedin: string;
  github: string;
  instagram: string;
  youtube: string;
  dribbble: string;
  discord: string;
  portfolio: string;
}

interface SocialLinksProps {
  links: SocialLinksData;
  onChange: (links: SocialLinksData) => void;
  onSave?: () => void;
}

const SocialLinks = ({
  links,
  onChange,
  onSave,
}: SocialLinksProps) => {
  const updateField = (
    key: keyof SocialLinksData,
    value: string
  ) => {
    onChange({
      ...links,
      [key]: value,
    });
  };

  const socialFields = [
    {
      key: "website",
      label: "Website",
      icon: <Globe size={18} />,
      placeholder: "https://yourwebsite.com",
    },
   
    {
      key: "github",
      label: "GitHub",
      icon: <Globe size={18} />,
      placeholder: "https://github.com/username",
    },
    
   
    {
      key: "dribbble",
      label: "Dribbble",
      icon: <Globe size={18} />,
      placeholder: "https://dribbble.com/username",
    },
    {
      key: "discord",
      label: "Discord",
      icon: <Globe size={18} />,
      placeholder: "https://discord.gg/yourserver",
    },
    {
      key: "portfolio",
      label: "Portfolio",
      icon: <Globe size={18} />,
      placeholder: "https://portfolio.com",
    },
  ] as const;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900">
      {/* Header */}
      <div className="border-b border-zinc-800 p-6">
        <h2 className="text-2xl font-bold text-white">
          Social Links
        </h2>

        <p className="mt-2 text-zinc-400">
          Connect your social accounts and portfolio.
        </p>
      </div>

      {/* Form */}
      <div className="grid gap-6 p-6 md:grid-cols-2">
        {socialFields.map((field) => (
          <div key={field.key}>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
              {field.icon}
              {field.label}
            </label>

            <input
              type="url"
              value={links[field.key]}
              placeholder={field.placeholder}
              onChange={(e) =>
                updateField(field.key, e.target.value)
              }
              className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end border-t border-zinc-800 p-6">
        <button
          onClick={() => onSave?.()}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          Save Social Links
        </button>
      </div>
    </div>
  );
};

export default SocialLinks;