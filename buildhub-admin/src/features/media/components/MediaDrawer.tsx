import {
  Image as ImageIcon,
  Video,
  FileText,
  Folder,
  User,
  Calendar,
  HardDrive,
  CheckCircle2,
  X,
} from "lucide-react";

interface MediaDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MediaDrawer = ({
  open,
  onClose,
}: MediaDrawerProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-violet-500/10 p-3">
              <ImageIcon className="h-6 w-6 text-violet-400" />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Media Details
              </h2>

              <p className="text-sm text-zinc-400">
                View uploaded media information.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Preview */}

          <div className="flex h-64 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">

            <ImageIcon className="h-24 w-24 text-violet-400" />

          </div>

          {/* Information */}

          <InfoCard
            icon={<FileText className="h-5 w-5 text-violet-400" />}
            title="File Name"
            value="Hero Banner.jpg"
          />

          <InfoCard
            icon={<Folder className="h-5 w-5 text-blue-400" />}
            title="Folder"
            value="Homepage"
          />

          <InfoCard
            icon={<User className="h-5 w-5 text-cyan-400" />}
            title="Uploaded By"
            value="Ahmad Sheikh"
          />

          <InfoCard
            icon={<Calendar className="h-5 w-5 text-yellow-400" />}
            title="Upload Date"
            value="01 Jul 2026"
          />

          <InfoCard
            icon={<HardDrive className="h-5 w-5 text-green-400" />}
            title="File Size"
            value="2.4 MB"
          />

          <InfoCard
            icon={<Video className="h-5 w-5 text-red-400" />}
            title="Media Type"
            value="Image"
          />

          <InfoCard
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-400" />}
            title="Status"
            value="Active"
          />

        </div>

        {/* Footer */}

        <div className="border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            Close
          </button>

        </div>

      </div>

    </>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const InfoCard = ({
  icon,
  title,
  value,
}: InfoCardProps) => (
  <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">

    <div className="rounded-xl bg-zinc-800 p-3">
      {icon}
    </div>

    <div>

      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h3 className="font-semibold text-white">
        {value}
      </h3>

    </div>

  </div>
);

export default MediaDrawer;