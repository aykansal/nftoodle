"use server";

import { redirect } from "next/navigation";

export async function createUser() {
  const res = await fetch("https://...");

  if (!res.ok) {
    return { message: "Please enter a valid email" };
  }

  redirect("/");
}
