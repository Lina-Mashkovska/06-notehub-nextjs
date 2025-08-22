"use client";


import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";


import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";


type Props = {
  initialSearch: string;
  initialPage: number;
};

export default function NotesClient({ initialSearch, initialPage }: Props) {

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch ?? "");
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

 
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, search: searchQuery }],
    queryFn: () => fetchNotes({ page, search: searchQuery }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  const totalPages = data.totalPages;


  const onSearchChange = (value: string) => {
    updateSearchQuery(value);
  };

  const onPageChange = (next: number) => {
    setPage(next);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {}
        <SearchBox value={searchQuery} onChange={onSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={onPageChange}
          />
        )}

        <button
          type="button"
          onClick={openModal}
          disabled={isModalOpen}
          aria-label="Create note"
          className={css.button}
        >
          Create note +
        </button>
      </header>

      {}
      {data.notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          {}
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}







