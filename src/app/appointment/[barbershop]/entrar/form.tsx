"use client";

import { signIn } from "next-auth/react";

export const AuthForm = () => {
  async function onSubmit() {
    const result = await signIn("credentials-customer", {
      username: "MiguelAlvesSousa@jourrapide.com",
      password: "anypassword",
      redirect: false,
    });
    console.log("auth result", result);
  }

  return (
    <div>
      <button type="button" onClick={onSubmit}>Fazer login</button>
    </div>
  );
};
