import { useEffect, useState } from "react";
import { getUserWebsites, type WebsitePayload } from "@/services/website";
import { toast } from "sonner";

export const useWebsites = (userId: string) => {
  const [websites, setWebsites] = useState<WebsitePayload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsites = async () => {
      setLoading(true);
      try {
        const data = await getUserWebsites(userId);
        setWebsites(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load websites.");
        toast.error("Unable to load websites.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      void fetchWebsites();
    }
  }, [userId]);

  return { websites, loading, error, setWebsites };
};
