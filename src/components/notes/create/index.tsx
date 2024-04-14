import { useEffect, useState } from "react";
import { initDB } from "../../../lib/db";
import { handleNote } from "./handler";

export const CreateNotes = () => {
  const [isDBReady, setIsDBReady] = useState(false);
  const [error, setError] = useState("");

  const handleIsDBReady = async () => {
    const status = await initDB();
    setIsDBReady(status);
  };

  useEffect(() => {
    handleIsDBReady();
  }, []);

  if (!isDBReady)
    return (
      <button
        className="mx-auto my-auto text-white bg-icms hover:bg-icmt transition-colors duration-500 ease-out py-2 px-4 rounded"
        onClick={handleIsDBReady}
      >
        Init DB
      </button>
    );

  return (
    <div className="flex flex-col w-full gap-2 max-h-[80vh] overflow-y-auto pb-2 px-1">
      <h2 className="font-semibold mb-2 text-lg">Create new note</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleNote(e, setError)}
      >
        <input
          className="p-2 rounded text-lg bg-icmb border-b-icmh border-0 border-b-2 text-icmt placeholder-icmt/50 outline-none focus-visible:border-b-icmt"
          type="text"
          name="title"
          placeholder="start writing here..."
        />
        <textarea
          className="p-2 rounded text-lg bg-icmb border-b-icmh border-0 border-b-2 text-icmt placeholder-icmt/50 outline-none focus-visible:border-b-icmt resize-none h-32"
          name="body"
          placeholder="start writing here..."
        />
        <button
          className="mx-auto my-auto text-white bg-icmh hover:bg-icmt transition-colors duration-500 ease-out py-2 px-4 rounded outline-none focus-visible:bg-icmt"
          type="submit"
        >
          Save
        </button>
        {error && <p className="text-red-500 text-sm">*{error}</p>}
      </form>
    </div>
  );
};
