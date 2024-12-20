"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { signUp } from "@/lib/api";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    passwordConfirmation: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })

  .refine(
    (data: { password: string; passwordConfirmation: string } | undefined) =>
      data?.password === data?.passwordConfirmation,
    {
      path: ["passwordConfirmation"],
      message: "Passwords do not match",
    }
  );

export default function Signup() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await signUp(values);
    if (res.status === "error") {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
      return;
    }

    // Successful Signup
    toast({
      title: "Success",
      description: "You have successfully signed up.",
    });
    router.push("/login");
  }

  return (
    <div className="grid place-items-center h-full">
      <div className="mt-10 w-96 p-5 shadow">
        <h1
          className="text-2xl font-semibold text-center
        "
        >
          Sign up
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@doe.com" {...field} />
                  </FormControl>
                  <FormDescription>This is your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>This is your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please confirm your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>

            <div className="flex justify-center">
              <a href="/login" className="text-blue-500">
                Already have an account? Sign in
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
