import type { Metadata } from "next";
import BeraterClient from "./BeraterClient";

export const metadata: Metadata = { title: "Bauberater" };

export default function BeraterPage() {
  return <BeraterClient />;
}
