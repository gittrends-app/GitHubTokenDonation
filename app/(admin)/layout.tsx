import { getServerSession } from "next-auth";
import * as React from "react";
import { authOptions } from "@/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return session?.user ? <>{children}</> : <h1>Unauthorized</h1>;
}
