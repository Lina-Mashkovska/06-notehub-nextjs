import { dehydrate, QueryClient } from "@tanstack/react-query";
import Hydrate from "@/components/TanStackProvider/Hydrate";
import NotesClient from "./Notes.client";
import { getNotes } from "@/lib/api";

export default async function NotesPage({ searchParams }: { searchParams: { page?: string; search?: string } }) {
  const page = Number(searchParams?.page ?? 1);
  const search = searchParams?.search ?? "";

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", { page, search }],
    queryFn: () => getNotes(search, page),
  });

  return (
    <Hydrate state={dehydrate(qc)}>
      <NotesClient initialPage={page} initialSearch={search} />
    </Hydrate>
  );
}
