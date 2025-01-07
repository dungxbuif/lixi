"use client";

import { Button } from "@/shared/components/atoms/Button";
import { signOut } from "next-auth/react";

export default function HomePage() {

  const handleLogout = () => {
    signOut()
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}
