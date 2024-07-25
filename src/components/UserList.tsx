import { getAllUsers } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "react-query";
import { User } from "./UserForm/UserForm";

type UserList = User & { id: number };

export const UserList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>ERROR</>;

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
        {data.users.map((user: UserList) => (
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
