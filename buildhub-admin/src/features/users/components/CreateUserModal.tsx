import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { getUserById, updateUserById } from "@/services/users";

const formatDisplayRole = (role?: string) => {
  const normalized = (role || "").toLowerCase();

  if (normalized === "admin") {
    return "Admin";
  }

  return "User";
};

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  userId?: string | number;
  onSave?: (user: any) => void;
}

interface InputProps {
  label: string;
  type?: string;
}

function Input({ label, type = "text", value, onChange }: InputProps & { value?: string; onChange?: (v: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  options: string[];
}

function Select({ label, options, value, onChange }: SelectProps & { value?: string; onChange?: (v: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose, mode = "create", userId, onSave }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [plan, setPlan] = useState("Free");
  const [status, setStatus] = useState("Active");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && userId) {
      (async () => {
        try {
          const data = await getUserById(String(userId));
          setFullName(data.fullName || data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setRole(formatDisplayRole(data.role));
          setPlan(data.plan || "Free");
          setStatus(data.isActive === false ? "Suspended" : data.status || "Active");
          setCompany(data.company || "");
        } catch (err) {
          console.error(err);
          toast.error("Unable to load user details.");
        }
      })();
    } else {
      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("User");
      setPlan("Free");
      setStatus("Active");
      setCompany("");
    }
  }, [open, mode, userId]);

  if (!open) return null;

  const handleSave = async () => {
    if (mode === "edit") {
      if (!userId) return;
      setLoading(true);
      try {
        const payload: any = {
          fullName,
          email,
          phone,
          role: role === "Admin" ? "admin" : "user",
          plan,
          status,
          company,
          isActive: status !== "Suspended",
        };
        const updated = await updateUserById(String(userId), payload);
        toast.success("User updated.");
        onSave?.(updated);
        onClose();
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message || "Failed to update user");
      } finally {
        setLoading(false);
      }
    } else {
      // create flow not implemented - close modal
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <h2 className="text-2xl font-bold text-white">{mode === "create" ? "Create New User" : "Edit User"}</h2>
          <button onClick={onClose} className="rounded-lg p-2 transition hover:bg-zinc-800">
            <X className="h-5 w-5 text-zinc-400" />
          </button>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <Input label="Full Name" value={fullName} onChange={setFullName} />
          <Input label="Email Address" type="email" value={email} onChange={setEmail} />
          <Input label="Phone Number" value={phone} onChange={setPhone} />
          <Input label="Password" type="password" value={password} onChange={setPassword} />

          <Select label="Role" value={role} onChange={setRole} options={["User", "Editor", "Admin", "Super Admin"]} />

          <Select label="Plan" value={plan} onChange={setPlan} options={["Free", "Pro", "Business", "Enterprise"]} />

          <Select label="Status" value={status} onChange={setStatus} options={["Active", "Pending", "Suspended"]} />

          <Input label="Company Name" value={company} onChange={setCompany} />
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">
          <button onClick={onClose} className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:border-blue-500">Cancel</button>

          <button onClick={handleSave} disabled={loading} className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60">
            {mode === "create" ? "Create User" : loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateUserModal;
