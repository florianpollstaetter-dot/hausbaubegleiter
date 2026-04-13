import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Preise" };

export default function PreisePage() {
  redirect("/#preise");
}
