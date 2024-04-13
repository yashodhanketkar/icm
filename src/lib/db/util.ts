export type NoteType = {
  id: string;
  title: string;
  body: string;
  done: boolean;
};

export enum Stores {
  Notes = "notes",
}

export const version = 1;
