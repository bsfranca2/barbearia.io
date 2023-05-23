"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { userAuthSchema } from "~/lib/validations/auth";
import { toast } from "~/hooks/use-toast";

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter()

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("credentials-employee", {
      username: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (!signInResult?.ok || signInResult?.error) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return router.push(searchParams?.get("from") || "/dashboard")
    // return toast({
    //   title: "Check your email",
    //   description: "We sent you a login link. Be sure to check your spam too.",
    // });
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">
          Email
        </Label>
        <div className="mt-2">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            {...register("email")}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password">
            Senha
          </Label>
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            {...register("password")}
          />
        </div>
      </div>

      <div>
        <Button className="w-full" type="submit">
          Entrar
        </Button>
      </div>
    </form>
  );
}
