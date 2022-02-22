import React, { useContext, useState } from "react";

import { Container, Grid, IconButton } from "@mui/material";
import { AppContext } from "../app";

import { PlayCircle as PlayCircleIcon } from "@mui/icons-material";

import { Navigate } from "react-router-dom";

import { CardsSeleccionadas } from "../components/CardsSeleccionadas";
import { Card } from "../components/Card";

import { useGetCard } from "../hooks/useGetCard";

import toast from "react-hot-toast";

const PageTablero = () => {
    const [mazo1, setMazo1] = useState([]);
    const [mazo2, setMazo2] = useState([]);

    const [selJug1, setSelJug1] = useState([]);
    const [selJug2, setSelJug2] = useState([]);

    const {
        objJugadore1,
        objJugadore2,
        objBaraja,
        handlerChangeJugador1,
        handlerChangeJugador2,
    } = useContext(AppContext);
    const { getData } = useGetCard();

    const ObtenerPuntosCartas = (suit) => {
        switch (suit) {
            case "HEARTS":
                return 5;

            case "SPADES":
                return 4;

            case "DIAMONDS":
                return 3;

            case "CLUBS":
                return 2;

            default:
                break;
        }
    };

    const validarGanador = () => {
        if (selJug1.length === 2 && selJug2.length === 2) {
            const valCard1Jug1 = selJug1[0];
            const valCard2Jug1 = selJug1[1];

            const valCard1Jug2 = selJug2[0];
            const valCard2Jug2 = selJug2[1];

            debugger

            if (valCard1Jug1.value === valCard2Jug1.value) {
                const pntosTotalJug1 =
                    ObtenerPuntosCartas(valCard1Jug1.suit) +
                    ObtenerPuntosCartas(valCard2Jug1.suit);

                if (valCard1Jug2.value === valCard2Jug2.value) {
                    const pntosTotalJug2 =
                        ObtenerPuntosCartas(valCard1Jug2.suit) +
                        ObtenerPuntosCartas(valCard2Jug2.suit);

                    if (pntosTotalJug1 > pntosTotalJug2) {
                        toast.success(
                            "El jugador 1 ha ganado por mayor puntaje de pintas"
                        );

                        return;
                    }

                    if (pntosTotalJug1 < pntosTotalJug2) {
                        toast.success(
                            "El jugador 2 ha ganado por mayor puntaje de pintas"
                        );

                        return;
                    }

                    toast.success(
                        "EL JUEGO HA SIDO EMPATADO NI DIOS SABE COMO"
                    );

                    return;
                }

                toast.success("Jugador 1 Gana");
                return;
            }

            if (valCard1Jug2.value === valCard2Jug2.value) {
                const pntosTotalJug2 =
                    ObtenerPuntosCartas(valCard1Jug2.suit) +
                    ObtenerPuntosCartas(valCard2Jug2.suit);

                if (valCard1Jug1.value === valCard2Jug1.value) {
                    const pntosTotalJug1 =
                        ObtenerPuntosCartas(valCard1Jug1.suit) +
                        ObtenerPuntosCartas(valCard2Jug1.suit);

                    if (pntosTotalJug1 > pntosTotalJug2) {
                        toast.success(
                            "El jugador 1 ha ganado por mayor puntaje de pintas"
                        );

                        return;
                    }

                    if (pntosTotalJug1 < pntosTotalJug2) {
                        toast.success(
                            "El jugador 2 ha ganado por mayor puntaje de pintas"
                        );

                        return;
                    }

                    toast.success(
                        "EL JUEGO HA SIDO EMPATADO NI DIOS SABE COMO"
                    );
                    return;
                }

                toast.success("Jugador 2 Gana");
                return;
            }
        }
    };

    const onClickPlay = async () => {
        const response = await getData(objBaraja.deck_id);

        const { cards } = response;

        if (cards.length === 0) {
            toast.error("No hay mas cartas disponibles en la baraja");
        } else {
            const auxMazo1 = mazo1;
            const auxMazo2 = mazo2;

            auxMazo1.push({ ...cards[0], selected: false });
            auxMazo2.push({ ...cards[1], selected: false });

            setMazo1(auxMazo1);
            setMazo2(auxMazo2);

            handlerChangeJugador1("mazo", auxMazo1);
            handlerChangeJugador2("mazo", auxMazo2);
        }
    };

    const onSelectedMazo1 = (code) => {
        const auxSel = selJug1;

        const auxMazo = mazo1;

        const index = auxMazo.findIndex((card) => card.code === code);

        if (auxMazo[index].selected) {
            toast.error("Jugador 1, esta carta ya fue seleccionada");
        } else {
            auxMazo[index].selected = true;

            const inFoCard = auxSel[0];

            if (inFoCard && auxSel.length >= 2) {
                auxMazo[
                    auxMazo.findIndex((card) => card.code === inFoCard.code)
                ].selected = false;

                auxSel.splice(0, 1);
            }

            auxSel.push(auxMazo[index]);

            setMazo1(auxMazo);
            setSelJug1(auxSel);
            handlerChangeJugador1("mazo", auxMazo);

            validarGanador();
        }
    };

    const onSelectedMazo2 = (code) => {
        const auxSel = selJug2;

        const auxMazo = mazo2;

        const index = auxMazo.findIndex((card) => card.code === code);

        if (auxMazo[index].selected) {
            toast.error("Jugador 2, esta carta ya fue seleccionada");
        } else {
            auxMazo[index].selected = true;

            const inFoCard = auxSel[0];

            if (inFoCard && auxSel.length >= 2) {
                auxMazo[
                    auxMazo.findIndex((card) => card.code === inFoCard.code)
                ].selected = false;

                auxSel.splice(0, 1);
            }

            auxSel.push(auxMazo[index]);

            setMazo2(auxMazo);
            setSelJug2(auxSel);
            handlerChangeJugador2("mazo", auxMazo);

            validarGanador();
        }
    };

    if (!objJugadore1 || !objJugadore2) {
        return <Navigate to="/" />;
    }

    return (
        <Container
            sx={{
                textAlign: "center",
            }}
        >
            <Grid container direction="row" sx={{ marginTop: "15px" }}>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: "800",
                        marginTop: "25px",
                    }}
                >
                    Jugador 1: {objJugadore1.nombre}
                </Grid>

                <Grid item xs={12} md={4}>
                    <IconButton color="secondary" onClick={() => onClickPlay()}>
                        <PlayCircleIcon
                            sx={{ fontSize: "50px" }}
                            htmlColor="#FFF"
                        />
                    </IconButton>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: "800",
                        marginTop: "25px",
                    }}
                >
                    Jugador 2: {objJugadore2.nombre}
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ borderRight: "1px solid white" }}
                >
                    <hr style={{ color: "white" }} />

                    <Grid container direction="row" spacing={3}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                fontSize: "18px",
                                color: "white",
                                fontWeight: "800",
                            }}
                        >
                            Cartas Opcionadas
                        </Grid>

                        <Grid item xs={12}>
                            <CardsSeleccionadas
                                image1={selJug1[selJug1.length - 2]?.image}
                                image2={selJug1[selJug1.length - 1]?.image}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                fontSize: "18px",
                                color: "white",
                                fontWeight: "800",
                            }}
                        >
                            Cartas Obtenidas
                            <hr style={{ color: "white" }} />
                        </Grid>

                        {objJugadore1?.mazo?.map(
                            ({ image, code, selected }, i) => (
                                <Grid item xs={4} key={i}>
                                    <Card
                                        image={image}
                                        code={code}
                                        selected={selected}
                                        onClick={(code) =>
                                            onSelectedMazo1(code)
                                        }
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                    <hr style={{ color: "white" }} />

                    <Grid container direction="row" spacing={3}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                fontSize: "18px",
                                color: "white",
                                fontWeight: "800",
                            }}
                        >
                            Cartas Opcionadas
                        </Grid>

                        <Grid item xs={12}>
                            <CardsSeleccionadas
                                image1={selJug2[0]?.image}
                                image2={selJug2[1]?.image}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                fontSize: "18px",
                                color: "white",
                                fontWeight: "800",
                            }}
                        >
                            Cartas Obtenidas
                            <hr style={{ color: "white" }} />
                        </Grid>

                        {objJugadore2?.mazo?.map(
                            ({ image, code, selected }, i) => (
                                <Grid item xs={4} key={i}>
                                    <Card
                                        image={image}
                                        code={code}
                                        selected={selected}
                                        onClick={(code) =>
                                            onSelectedMazo2(code)
                                        }
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PageTablero;
