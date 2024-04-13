import { Footer, Header } from "../components/ui";
import { NotesView } from "./notes";

export const Layout = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-between">
      <Header />
      <main className="mb-auto container mx-auto my-4">
        <NotesView />
      </main>
      <Footer />
    </div>
  );
};
