import { NoteType } from "../../../lib/db";

export const NoteListBuilder = ({
  name,
  count,
  notesList,
  handleUpdateNotes,
  handleDeleteNotes,
}: {
  name: string;
  count: number;
  notesList: NoteType[];
  handleUpdateNotes: (note: NoteType) => void;
  handleDeleteNotes: (id: string) => void;
}) => {
  if (!!!notesList.length) return;

  return (
    <>
      <p className="inline-flex gap-2">
        <span className="font-semibold">{name}</span>({notesList.length}/{count}
        )
      </p>
      <hr className="border-icmt py-1" />
      {notesList
        .sort((a, b) => (a.id < b.id ? 1 : -1))
        .map((note) => (
          <div
            key={note.id}
            className="flex flex-row justify-between gap-2 p-2 ring-1 ring-icmh rounded z-10"
          >
            <span onClick={() => handleUpdateNotes(note)}>
              [{note.done ? "x" : " "}]
            </span>
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
    </>
  );
};
