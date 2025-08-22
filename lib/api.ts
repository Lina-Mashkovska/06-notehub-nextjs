
import axios from "axios";
import type { Note, NewNote } from "@/types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

if (myKey) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${myKey}`;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function getNotes(search: string, page: number): Promise<NotesResponse> {
  const response = await axios.get<NotesResponse>("/notes", {
    params: {
      ...(search !== "" ? { search } : {}),
      page,
    },
  });
  return response.data;
}


export const fetchNotes = (args: { search: string; page: number }) =>
  getNotes(args.search, args.page);

export async function fetchNoteById(id: number): Promise<Note> {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
}

export const getSingleNote = (id: string | number) => fetchNoteById(Number(id));

export async function deleteNote(noteId: number): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
}


export async function createNote(note: NewNote): Promise<Note> {
  const res = await axios.post<Note>("/notes", note);
  return res.data;
}


export const addNote = createNote;