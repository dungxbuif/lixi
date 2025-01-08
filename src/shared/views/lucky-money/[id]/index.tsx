import React from "react";

interface Props {
    id: number;
}
const LuckyMoneyDetails = ({ id }: Props) => {

    console.log(id)

    return <div>LuckyMoneyDetails: {id}</div>;
};

export default LuckyMoneyDetails;
