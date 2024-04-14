import { useEffect, useState } from "react";
import {
  NoteType,
  Stores,
  deleteData,
  getData,
  updateData,
} from "../../../lib/db";
import { NoteListBuilder } from "./builder";

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
    return (
      <div className="flex flex-col items-center w-full gap-2 max-h-[80vh] overflow-y-auto pb-2 px-1">
        <p>No notes found!</p>
        <p>If you think this is an error please click on load button.</p>
        <button
          onClick={handleGetNotes}
          className="mx-auto text-white bg-icmh hover:bg-icmt transition-colors duration-500 ease-out py-2 px-4 rounded outline-none focus-visible:bg-icmt"
        >
          Load
        </button>
      </div>
    );

  return (
    <div className="flex flex-col w-full gap-2 max-h-[80vh] overflow-y-auto pb-2 px-1">
      <h2 className="font-semibold mb-2 text-lg">Notes list</h2>
      <NoteListBuilder
        name="Active"
        count={notesList.length}
        notesList={notesList.filter((e) => !e.done)}
        handleDeleteNotes={handleDeleteNotes}
        handleUpdateNotes={handleUpdateNotes}
      />
      <NoteListBuilder
        name="Inactive"
        count={notesList.length}
        notesList={notesList.filter((e) => !!e.done)}
        handleDeleteNotes={handleDeleteNotes}
        handleUpdateNotes={handleUpdateNotes}
      />
    </div>
  );
};
