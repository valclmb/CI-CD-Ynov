import { getAllUsers } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { User } from "./UserForm/UserForm";

type UserList = User & { id: number };

export const UserList = () => {
  const [users, setUsers] = useState<UserList[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Prénom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date de naissance</TableHead>
          <TableHead>Ville</TableHead>
          <TableHead>Code Postal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.lastName.toUpperCase()}</TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.birthDate}</TableCell>
            <TableCell>{user.city}</TableCell>
            <TableCell>{user.zipCode}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
