import {
  User,
  Settings,
  CreditCard,
  Shield,
  LogOut,
  Moon,
} from "lucide-react";

const menu = [
  {
    title: "My Profile",
    icon: User,
  },
  {
    title: "Account Settings",
    icon: Settings,
  },
  {
    title: "Billing",
    icon: CreditCard,
  },
  {
    title: "Security",
    icon: Shield,
  },
  {
    title: "Dark Theme",
    icon: Moon,
  },
];

const ProfileDropdown = () => {
  return (
    <div className="absolute right-0 top-16 z-50 w-72 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

      <div className="border-b border-zinc-800 p-5">

        <h2 className="font-semibold text-white">
          Ahmad Sheikh
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          admin@buildhub.ai
        </p>

      </div>

      <div className="p-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              <Icon size={18} />

              {item.title}
            </button>
          );
        })}

      </div>

      <div className="border-t border-zinc-800 p-2">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10">

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
};

export default ProfileDropdown;