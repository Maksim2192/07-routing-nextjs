import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import NotesClients from "./Notes.client";
import { fetchNotes, FetchNotesResponse } from "../../lib/api";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes("", 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClients />
    </HydrationBoundary>
  );
}