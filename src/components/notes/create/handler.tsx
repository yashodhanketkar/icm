import { Stores, addData } from "../../../lib/db";

export const handleNote = async (
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
