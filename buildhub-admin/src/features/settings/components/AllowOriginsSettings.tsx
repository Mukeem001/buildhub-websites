import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllowOrigins, createAllowOrigin, deleteAllowOrigin } from "@/services/allowOrigins";

const AllowOriginsSettings = () => {
  const [list, setList] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [newOrigin, setNewOrigin] = useState("");

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await getAllowOrigins();
      setList(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load allowed origins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchList();
  }, []);

  const handleAdd = async () => {
    if (!newOrigin.trim()) return;
    try {
      const created = await createAllowOrigin(newOrigin.trim());
      setList((s) => [created, ...s]);
      setNewOrigin("");
      toast.success("Origin added");
    } catch (err) {
      console.error(err);
      toast.error("Unable to add origin");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this origin?")) return;
    try {
      await deleteAllowOrigin(id);
      setList((s) => s.filter((x) => x._id !== id));
      toast.success("Origin removed");
    } catch (err) {
      console.error(err);
      toast.error("Unable to remove origin");
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Allowed Origins</h2>

      <div className="mb-4 flex gap-2">
        <input
          value={newOrigin}
          onChange={(e) => setNewOrigin(e.target.value)}
          placeholder="https://example.com or example.com"
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white"
        />
        <button onClick={handleAdd} className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black">Add</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-2">
          {list.length === 0 && <div className="text-zinc-400">No origins configured.</div>}
          {list.map((item) => (
            <div key={item._id} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2">
              <div className="text-white">{item.origin}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleDelete(item._id)} className="text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllowOriginsSettings;
