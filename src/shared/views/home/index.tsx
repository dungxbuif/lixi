"use client"
import { Button } from "@/shared/components/atoms/Button";
import { signOut } from "next-auth/react";
import React from "react";

const HomePage = () => {
    return <div>
        HomePage
        <Button onClick={() => signOut()}>Log out</Button>
    </div>;
};

export default HomePage;
