import { useState } from "react";
import { NoteType, Stores, getData } from "../../lib/db";

export const ReadNotes = () => {
  const [notesList, setNotesList] = useState<[] | NoteType[]>([]);

  const handleGetNotes = async () => {
    const notesRes = await getData<NoteType>(Stores.Notes);
    setNotesList(notesRes);
  };

  return (
    <>
      {!!notesList.length ? (
        notesList.map((note) => (
          <div key={note.id} className="flex-row flex">
            <span>{note.title}</span>
            <span>{note.body}</span>
          </div>
        ))
      ) : (
        <button onClick={handleGetNotes}>Load</button>
      )}
    </>
  );
};
