
export type NoteTag = "Todo" | "Work" | "Personal" | "Other";

export interface Note {
  id: number;            
  title: string;
  content: string;
  tag: NoteTag;         
  createdAt: string;     
  updatedAt: string;     
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}
