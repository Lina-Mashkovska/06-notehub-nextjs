
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { getNotes } from "@/lib/api";

type SearchParams = { page?: string; search?: string };

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page: pageStr, search: rawSearch } = await searchParams;
  const page = Number(pageStr ?? 1);
  const search = rawSearch ?? "";

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", { page, search }],
    queryFn: () => getNotes({ page, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient initialPage={page} initialSearch={search} />
    </HydrationBoundary>
  );
}


