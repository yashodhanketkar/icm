import { CreateNotes, ReadNotes } from "../../components/notes";

export const NotesView = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <h1 className="col-span-1 md:col-span-2 text-3xl font-semibold">Notes</h1>
      <CreateNotes />
      <ReadNotes />
    </div>
  );
};
