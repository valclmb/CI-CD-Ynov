import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { UserForm } from "./UserForm/UserForm";

export const AddUser = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Ajouter un utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Ajouter un utilisateur</DialogTitle>
        <UserForm close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
