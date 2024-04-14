import { useEffect, useState } from "react";
import { CreateNotes, ReadNotes } from "../../components/notes";

export const NotesView = () => {
  const [showCreateNotes, setShowCreateNotes] = useState(false);

  const toggleShowCreateNotes = () => {
    const newState = !showCreateNotes;
    localStorage.setItem("showCreateNotesState", String(newState));
    setShowCreateNotes(newState);
  };

  useEffect(() => {
    const savedState = localStorage.getItem("showCreateNotesState");
    setShowCreateNotes(savedState === "true");
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 px-2 md:px-0 md:grid-cols-2">
      <h1 className="col-span-1 md:col-span-2 text-3xl font-semibold">Notes</h1>
      <button
        className="absolute flex justify-center items-center top-18 right-4 ring-1 ring-icmh rounded hover:bg-icmh/50 w-[6ch] h-[3ch] transition-all duration-500"
        onClick={toggleShowCreateNotes}
      >
        {showCreateNotes ? "Hide" : "Show"}
      </button>
      {showCreateNotes && <CreateNotes />}
      <div className={showCreateNotes ? "" : "md:col-span-2"}>
        <ReadNotes />
      </div>
    </div>
  );
};
