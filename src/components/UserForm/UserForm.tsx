import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { createUser } from "@/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { formSchema } from "./formSchema";

export type User = z.infer<typeof formSchema>;
type UserFormProps = {
  close: () => void;
};

export const UserForm = ({ close }: UserFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<User>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "2000-01-01",
      city: "",
      zipCode: "",
    },
  });

  const onSubmit = (data: User) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: (data: User) => createUser(data),
    onSuccess: (res) => {
      if (res.success) {
        console.log("success");

        toast({
          title: "Utilisateur créé !",
          description: "Votre compte a bien été créé",
        });
        form.reset();
        queryClient.invalidateQueries(["users"]);
        close();

        return;
      }

      toast({
        title: "Une erreur est survenue !",
        description: res.message,
      });
    },
  });

  return (
    <Form {...form}>
      <form
        className=" flex flex-col justify-center gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input type="text" data-testid="firstName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input type="text" data-testid="lastName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" data-testid="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
                <Input type="date" data-testid="birthDate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input type="text" data-testid="city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code postal</FormLabel>
              <FormControl>
                <Input type="text" data-testid="zipCode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button role="button" type="submit" disabled={!form.formState.isValid}>
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};
