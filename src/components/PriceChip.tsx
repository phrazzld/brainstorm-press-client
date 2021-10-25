import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Chip from "@mui/material/Chip";
import React from "react";

interface Props {
    price: number;
    paid: boolean;
}

export const PriceChip = (props: Props) => {
    const { price, paid } = props;

    if (price > 0 && !paid) {
        return (
            <Chip
                label={`${price} sats`}
                icon={<LockOutlinedIcon />}
                color="warning"
                variant="outlined"
            />
        );
    }
    if (price > 0 && paid) {
        return (
            <Chip
                label={`${price} sats`}
                icon={<LockOpenOutlinedIcon />}
                color="success"
                variant="outlined"
            />
        );
    }
    return <Chip label="Free" color="success" variant="outlined" />;
};
