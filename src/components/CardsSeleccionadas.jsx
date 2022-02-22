import React from "react";

import { Box } from "@mui/material";

export const CardsSeleccionadas = ({ image1, image2 }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            <Box sx={{ padding: "5px" }}>
                <img
                    src={
                        image1 ||
                        "https://www.magicbravo.es/WebRoot/Store/Shops/magicbravo/5239/D2EA/0C66/837E/DB3A/55EE/0960/B083/CARTAS_QUITA_Y_PON_DORSO.jpg"
                    }
                    alt="carta"
                    width="150px"
                />
            </Box>

            <Box sx={{ padding: "5px" }}>
                <img
                    src={
                        image2 ||
                        "https://www.magicbravo.es/WebRoot/Store/Shops/magicbravo/5239/D2EA/0C66/837E/DB3A/55EE/0960/B083/CARTAS_QUITA_Y_PON_DORSO.jpg"
                    }
                    alt="carta"
                    width="150px"
                />
            </Box>
        </Box>
    );
};
