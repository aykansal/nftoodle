"use server";

import { redirect } from "next/navigation";

export async function createUser(prevState: any, formData: FormData) {
  const res = await fetch("https://...");
  const json = await res.json();

  if (!res.ok) {
    return { message: "Please enter a valid email" };
  }

  redirect("/");
}
