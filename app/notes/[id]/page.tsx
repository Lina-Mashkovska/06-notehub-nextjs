import { dehydrate, QueryClient } from "@tanstack/react-query";
import Hydrate from "@/components/TanStackProvider/Hydrate";
import NoteDetailsClient from "./NoteDetails.client";
import { getSingleNote } from "@/lib/api";

export default async function NoteDetailsPage({ params }: { params: { id: string } }) {
  const idNum = Number(params.id); 

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["note", idNum],         
    queryFn: () => getSingleNote(idNum), 
  });

  return (
    <Hydrate state={dehydrate(qc)}>
      {}
      <NoteDetailsClient />
    </Hydrate>
  );
}

