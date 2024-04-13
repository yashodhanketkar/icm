import { useEffect, useState } from "react";
import { Stores } from "../../lib/db/util";
import { initDB, addData } from "../../lib/db";

const handleNote = async (
  e: React.FormEvent<HTMLFormElement>,
  setError: (msg: string) => void,
) => {
  e.preventDefault();

  const target = e.target as typeof e.target & {
    title: { value: string };
    body: { value: string };
  };

  const title = target.title.value;
  const body = target.body.value;
  const id = Date.now();

  if (title.trim() === "" || body.trim() === "") {
    alert("Please enter valid values");
    return;
  }

  try {
    await addData(Stores.Notes, { title, body, id });
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Something went wrong!");
    }
  }

  window.location.reload();
};

export const CreateNotes = () => {
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
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
    <div>
      <h2 className="font-semibold mb-2 text-lg">Create new note</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleNote(e, setError)}
      >
        <input
          className="p-2 rounded text-lg"
          type="text"
          name="title"
          placeholder="title"
        />
        <input
          className="p-2 rounded text-lg"
          type="text"
          name="body"
          placeholder="body"
        />
        <button
          className="mx-auto my-auto text-white bg-icms hover:bg-icmt transition-colors duration-500 ease-out py-2 px-4 rounded"
          type="submit"
        >
          Save
        </button>
        {error && <p className="text-red-500 text-sm">*{error}</p>}
      </form>
    </div>
  );
};
