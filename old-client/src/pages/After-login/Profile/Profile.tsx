import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Name</p>
          <div className="mt-2 text-lg font-semibold">{user?.fullName || user?.email}</div>

          <p className="mt-4 text-slate-400">Email</p>
          <div className="mt-2 text-lg font-medium">{user?.email}</div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
