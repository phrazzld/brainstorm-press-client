import Chip from "@mui/material/Chip";
import React from "react";

interface Props {
    premium: boolean;
}

export const PriceChip = (props: Props) => {
    const { premium } = props;

    if (premium) {
        return <Chip label="Premium" color="warning" variant="outlined" />;
    }
    return <Chip label="Free" color="success" variant="outlined" />;
};
