/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";

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
import { signIn } from "@/lib/api";
import { authStore } from "@/lib/stores/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/components/Loading";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Signin() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const setToken = authStore((state: any) => state.setToken);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await signIn(values);
    if (res.status === "error") {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Success",
      description: "You have successfully logged in.",
    });

    // Login Success
    // @ts-expect-error - no typ
    setToken(res.data.data.accessToken);

    // store the token in a cookie
    // @ts-expect-error - no typ
    Cookies.set("accessToken", res.data.data.accessToken, {
      expires: 7,
    });

    setLoading(false);

    router.push("/");
  }

  return (
    <div className="grid place-items-center h-full">
      <div className="mt-10 w-96 p-5 shadow">
        {loading && <Loading />}

        <div className="text-2xl font-semibold text-center">Sign In</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            <Button type="submit">Login</Button>

            <div className="flex justify-center">
              <a href="/signup" className="text-blue-500">
                Don&apos;t have an account? Sign up
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
