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
            className="inline-flex justify-between items-start gap-2 p-2 ring-1 ring-icmh rounded z-10"
          >
            <span
              className="w-6 cursor-pointer"
              onClick={() => handleUpdateNotes(note)}
            >
              [{note.done ? "x" : " "}]
            </span>
            <div className="flex flex-col w-full mr-auto">
              <p className="font-semibold">{note.title}</p>
              <p>{note.body}</p>
            </div>
            <button
              type="button"
              name="delete"
              className="font-extrabold w-4 text-xl text-icmt z-50"
              onClick={() => handleDeleteNotes(note.id)}
            >
              X
            </button>
          </div>
        ))}
    </>
  );
};
