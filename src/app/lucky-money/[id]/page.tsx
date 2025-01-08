import LuckyMoneyDetails from "@/shared/views/lucky-money/[id]";
import React from "react";

export default async function Page({ params }) {
    const id = params['id'];
    return <LuckyMoneyDetails id={+id} />;
}
