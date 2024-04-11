import { useState } from "react";
import { Stores, addData, initDB } from "../../lib/db";

export const CreateNotes = () => {
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleNote = async (e: React.FormEvent<HTMLFormElement>) => {
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

    target.body.value = "";
    target.title.value = "";
  };

  const handleIsDBReady = async () => {
    const status = await initDB();
    setIsDBReady(status);
  };

  return (
    <div>
      <h1>Notes</h1>
      {!isDBReady ? (
        <button onClick={handleIsDBReady}>Init DB</button>
      ) : (
        <>
          <p>DB is ready!</p>
          <form onSubmit={handleNote}>
            <input type="text" name="title" placeholder="title" />
            <input type="text" name="body" placeholder="body" />
            <button type="submit">Save</button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};
