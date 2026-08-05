import {
  Monitor,
  Smartphone,
  Globe,
  LogOut,
} from "lucide-react";
import { Session } from "../types/profile";

interface SessionsProps {
  sessions: Session[];
  onLogoutSession?: (id: string) => void;
  onLogoutAll?: () => void;
}

const Sessions = ({
  sessions,
  onLogoutSession,
  onLogoutAll,
}: SessionsProps) => {

  const currentSession = sessions.find(
    (session) => session.current
  );

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-zinc-800 p-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Active Sessions
          </h2>

          <p className="mt-2 text-zinc-400">
            Manage all devices currently signed into your account.
          </p>

        </div>

        <button
          onClick={() => onLogoutAll?.()}
          className="rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          Logout All Other Devices
        </button>

      </div>

      {/* Session List */}

      <div className="space-y-5 p-6">

        {sessions.map((session) => (

          <div
            key={session.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-cyan-500"
          >

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-5">

                <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400">

                  {session.device === "Mobile" ? (
                    <Smartphone size={28} />
                  ) : (
                    <Monitor size={28} />
                  )}

                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="text-lg font-semibold text-white">
                      {session.browser}
                    </h3>

                    {session.current && (

                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                        CURRENT SESSION
                      </span>

                    )}

                  </div>

                  <p className="mt-2 text-zinc-400">
                    {session.device} • {session.os}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-500">

                    <div className="flex items-center gap-2">

                      <Globe size={15} />

                      {session.ipAddress}

                    </div>

                    <div>
                      📍 {session.location}
                    </div>

                    <div>
                      🕒 {session.lastActive}
                    </div>

                  </div>

                </div>

              </div>

              {!session.current && (

                <button
                  onClick={() =>
                    onLogoutSession?.(session.id)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              )}

            </div>

          </div>

        ))}
                {/* Session Statistics */}

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <h3 className="mb-6 text-xl font-semibold text-white">
            Session Overview
          </h3>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {/* Total Sessions */}

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Total Sessions
              </p>

              <h4 className="mt-2 text-2xl font-bold text-white">
                {sessions.length}
              </h4>

            </div>

            {/* Active Desktop */}

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Desktop Devices
              </p>

              <h4 className="mt-2 text-2xl font-bold text-cyan-400">
                {
                  sessions.filter(
                    (session) => session.device !== "Mobile"
                  ).length
                }
              </h4>

            </div>

            {/* Active Mobile */}

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Mobile Devices
              </p>

              <h4 className="mt-2 text-2xl font-bold text-cyan-400">
                {
                  sessions.filter(
                    (session) => session.device === "Mobile"
                  ).length
                }
              </h4>

            </div>

            {/* Current Session */}

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Current Session
              </p>

              <h4 className="mt-2 text-lg font-bold text-emerald-400">
                {currentSession
                  ? currentSession.browser
                  : "Unavailable"}
              </h4>

            </div>

          </div>

        </div>

        {/* Security Status */}

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <h3 className="mb-4 text-xl font-semibold text-white">
            Session Security
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex items-center justify-between">

              <span className="text-zinc-400">
                Current Active Sessions
              </span>

              <span className="font-semibold text-white">
                {sessions.length}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-zinc-400">
                Current Device Protected
              </span>

              <span className="font-semibold text-emerald-400">
                Yes
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-zinc-400">
                Suspicious Activity
              </span>

              <span className="font-semibold text-emerald-400">
                None Detected
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Sessions;