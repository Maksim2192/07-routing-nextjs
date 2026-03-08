"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "../../lib/api";
import { NoteList } from "../../components/NoteList/NoteList";
import NoteForm from "../../components/NoteForm/NoteForm";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import SearchBox from "../../components/SearchBox/SearchBox";

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: ({ queryKey }) => {
      const [, searchParam, pageParam] = queryKey as [string, string, number];
      return fetchNotes(searchParam, pageParam);
    },
    placeholderData: (prevData) => prevData,
  });

  const handleSearchChange = (value: string) => setSearch(value);

  return (
    <div>
      <header>
        <button onClick={() => setModalOpen(true)}>Create Note</button>
      </header>

      <SearchBox value={search} onChange={handleSearchChange} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data && (
        <>
          {data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}

          <NoteList notes={data.notes} />
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;