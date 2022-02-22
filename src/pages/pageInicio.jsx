import React, { useContext } from "react";

import { useForm, Controller } from "react-hook-form";

import {
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import { AppContext } from "../app";
import { Navigate } from "react-router-dom";

export const PageInicio = () => {
    const {
        handlerChangeJugador1,
        handlerChangeJugador2,
        objJugadore1,
        objJugadore2,
    } = useContext(AppContext);

    const {
        formState: { errors },
        control,
        handleSubmit,
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        handlerChangeJugador1("nombre", data.nombreJug1);
        handlerChangeJugador2("nombre", data.nombreJug2);
    };

    if (objJugadore1 || objJugadore2) {
        return <Navigate to="/tablero" />;
    }

    return (
        <Container>
            <Paper
                sx={{
                    padding: "28px",
                    marginTop: "200px",
                    position: "relative",
                }}
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            align="center"
                            variant="h6"
                            sx={{ fontWeight: "800" }}
                        >
                            Juego de Cartas
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Quads_A.svg/1105px-Quads_A.svg.png"
                                alt="icon"
                                width="120px"
                                style={{
                                    position: "absolute",
                                    top: "0px",
                                    left: "1100px",
                                }}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="nombreJug1"
                            defaultValue=""
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Jugador 1"
                                    value={value}
                                    name={name}
                                    onChange={(e) => onChange(e)}
                                    error={errors?.nombreJug1 ? true : false}
                                    helperText={
                                        errors?.nombreJug1?.message ||
                                        "Digita el nombre del jugador 1"
                                    }
                                    variant="standard"
                                    fullWidth
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el nombre del jugador 1",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="nombreJug2"
                            defaultValue=""
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Jugador 2"
                                    value={value}
                                    name={name}
                                    onChange={(e) => onChange(e)}
                                    error={errors?.nombreJug2 ? true : false}
                                    helperText={
                                        errors?.nombreJug2?.message ||
                                        "Digita el nombre del jugador 2"
                                    }
                                    variant="standard"
                                    fullWidth
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el nombre del jugador 2",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="success"
                            fullWidth
                        >
                            Jugar
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Desarrollado por: Santiago Cardona Saldarriaga &
                            Santiago Alonso Arbelaez Ocampo
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
