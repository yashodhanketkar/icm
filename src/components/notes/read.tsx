import { useEffect, useState } from "react";
import {
  NoteType,
  Stores,
  deleteData,
  getData,
  updateData,
} from "../../lib/db";

export const ReadNotes = () => {
  const [notesList, setNotesList] = useState<[] | NoteType[]>([]);

  const handleGetNotes = async () => {
    const notesRes = await getData<NoteType>(Stores.Notes);
    setNotesList(notesRes);
  };

  const handleUpdateNotes = async (note: NoteType) => {
    updateData(Stores.Notes, note);
    handleGetNotes();
  };

  const handleDeleteNotes = async (id: string) => {
    deleteData(Stores.Notes, id);
    handleGetNotes();
  };

  useEffect(() => {
    handleGetNotes();
  }, []);

  if (notesList.length <= 0)
    return <button onClick={handleGetNotes}>Load</button>;

  return (
    <div className="flex flex-col w-full gap-2">
      <h2 className="font-semibold mb-2 text-lg">Notes list</h2>
      {notesList.map((note) => (
        <div
          key={note.id}
          className="flex flex-row justify-between gap-2 p-2 ring-1 ring-icmh rounded z-10"
          onClick={() => handleUpdateNotes(note)}
        >
          <span>[{note.done ? "x" : " "}]</span>
          <span>{note.title}</span>
          <span className="mr-auto">{note.body}</span>
          <button
            type="button"
            name="delete"
            className="font-extrabold text-xl text-red-500 z-50"
            onClick={() => handleDeleteNotes(note.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};
