import { fetcher } from "@/lib/fetcher";

export async function getAllLiveStreams() {
    return fetcher('/api/live-streams');
  }