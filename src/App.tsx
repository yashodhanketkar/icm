import { ReadNotes } from "./components/notes";
import { CreateNotes } from "./components/notes/create";

const App = () => {
  return (
    <>
      <header>header</header>
      <main className="text-red-500">
        Body
        <CreateNotes />
        <ReadNotes />
      </main>
      <footer>footer</footer>
    </>
  );
};

export default App;
