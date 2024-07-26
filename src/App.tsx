import { AddUser } from "./components/AddUser";
import { Toaster } from "./components/ui/toaster";
import { UserList } from "./components/UserList";

export default function App() {
  return (
    <div className="h-screen p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Liste des utilisateurs
      </h1>

      <AddUser />
      <UserList />
      <Toaster />
    </div>
  );
}
