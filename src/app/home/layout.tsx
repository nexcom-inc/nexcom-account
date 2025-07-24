"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <RequireAuth>{children}</RequireAuth>;
};

export default HomeLayout;
