import { useEffect, useRef, useState } from "react";
import {
  Send,
  Paperclip,
  Smile,
  User,
} from "lucide-react";

export interface Reply {
  id: number;
  sender: "Customer" | "Agent";
  name: string;
  message: string;
  createdAt: string;
}

interface TicketRepliesProps {
  replies: Reply[];
  onSend: (message: string) => void;
}

const TicketReplies = ({
  replies,
  onSend,
}: TicketRepliesProps) => {
  const [message, setMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [replies]);

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message.trim());

    setMessage("");
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">

      {/* Header */}

      <div className="border-b border-zinc-800 p-5">

        <h2 className="text-lg font-semibold text-white">
          Conversation
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Customer and support team messages
        </p>

      </div>

      {/* Messages */}

      <div className="max-h-[500px] space-y-5 overflow-y-auto p-6">

        {replies.map((reply) => {

          const customer =
            reply.sender === "Customer";

          return (
            <div
              key={reply.id}
              className={`flex ${
                customer
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl p-4 ${
                  customer
                    ? "bg-zinc-800"
                    : "bg-cyan-500 text-black"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">

                  <div
                    className={`rounded-full p-2 ${
                      customer
                        ? "bg-zinc-700"
                        : "bg-white/20"
                    }`}
                  >
                    <User size={14} />
                  </div>

                  <div>

                    <p
                      className={`text-sm font-semibold ${
                        customer
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {reply.name}
                    </p>

                    <p
                      className={`text-xs ${
                        customer
                          ? "text-zinc-400"
                          : "text-black/70"
                      }`}
                    >
                      {reply.createdAt}
                    </p>

                  </div>

                </div>

                <p
                  className={`leading-7 ${
                    customer
                      ? "text-zinc-200"
                      : "text-black"
                  }`}
                >
                  {reply.message}
                </p>

              </div>

            </div>
          );
        })}

        <div ref={bottomRef} />

      </div>

      {/* Composer */}

      <div className="border-t border-zinc-800 p-5">

        <div className="rounded-2xl border border-zinc-700 bg-zinc-950 p-4">

          <textarea
            rows={4}
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Write your reply..."
            className="w-full resize-none bg-transparent text-white outline-none placeholder:text-zinc-500"
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

            <div className="flex gap-2">

              <button
                type="button"
                className="rounded-lg p-2 transition hover:bg-zinc-800"
              >
                <Paperclip
                  className="text-zinc-400"
                  size={18}
                />
              </button>

              <button
                type="button"
                className="rounded-lg p-2 transition hover:bg-zinc-800"
              >
                <Smile
                  className="text-zinc-400"
                  size={18}
                />
              </button>

            </div>

            <button
              onClick={handleSend}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              <Send size={18} />
              Send Reply
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TicketReplies;