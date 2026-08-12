import {
  Globe,
  X,
  Shield,
  Calendar,
  User,
  Building2,
  Server,
} from "lucide-react";

interface DomainDrawerProps {
  open: boolean;
  onClose: () => void;
  domain?: any;
}

const DomainDrawer = ({
  open,
  onClose,
  domain,
}: DomainDrawerProps) => {
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

            <div className="rounded-xl bg-cyan-500/10 p-3">
              <Globe className="h-6 w-6 text-cyan-400" />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Domain Details
              </h2>

              <p className="text-sm text-zinc-400">
                Complete information about the selected domain.
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

        {/* Content */}

        <div className="flex-1 space-y-6 overflow-y-auto p-6">

          {/* Domain */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

            <div className="flex items-center gap-3">

              <Globe className="h-5 w-5 text-cyan-400" />

              <div>

                <p className="text-sm text-zinc-400">
                  Domain
                </p>

                <h3 className="text-lg font-semibold text-white">
                  {domain?.domain || "-"}
                </h3>

              </div>

            </div>

          </div>

          {/* Grid */}

          <div className="grid gap-4">

            <InfoCard
              icon={<Building2 className="h-5 w-5 text-cyan-400" />}
              title="Website"
              value="BuildHub"
            />

            <InfoCard
              icon={<User className="h-5 w-5 text-cyan-400" />}
              title="Owner"
              value="Ahmad Sheikh"
            />

            <InfoCard
              icon={<Server className="h-5 w-5 text-cyan-400" />}
              title="Registrar"
              value={domain?.cnameTarget || "-"}
            />

            <InfoCard
              icon={<Shield className="h-5 w-5 text-green-400" />}
              title="SSL Status"
              value={domain?.sslStatus ? domain.sslStatus.charAt(0).toUpperCase() + domain.sslStatus.slice(1) : "-"}
            />

            <InfoCard
              icon={<Globe className="h-5 w-5 text-green-400" />}
              title="Connection"
              value={domain?.verificationStatus ? (domain.verificationStatus === "verified" ? "Connected" : domain.verificationStatus) : "-"}
            />

            <InfoCard
              icon={<Calendar className="h-5 w-5 text-yellow-400" />}
              title="Expiry Date"
              value="15 Dec 2027"
            />

            <InfoCard
              icon={<Calendar className="h-5 w-5 text-cyan-400" />}
              title="Created At"
              value="10 Jan 2025"
            />

          </div>

          {domain?.sslError ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <p className="font-semibold">SSL Error</p>
              <pre className="mt-2 whitespace-pre-wrap text-xs text-red-100">{domain.sslError}</pre>
            </div>
          ) : null}

        </div>

        {/* Footer */}

        <div className="border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-500"
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

    <div className="rounded-lg bg-zinc-800 p-3">
      {icon}
    </div>

    <div>

      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h4 className="font-semibold text-white">
        {value}
      </h4>

    </div>

  </div>
);

export default DomainDrawer;